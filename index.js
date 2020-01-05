const fs = require("fs");

const inquirer = require("inquirer");

const path = require("path");

const open = require("open");

const api = require("./api");

const generateHTML = require("./html");

const convertFactory = require("electron-html-to");

const questions = [
  {
    type: "input",
    name: "github",
    message: "Please enter your GitHub username : "
  },

  {
    type: "list",
    name: "color",
    message: "What color would you like for your profile ?",
    choices: ["Green", "Blue", "Pink", "Red"]
  }
];

function writeToFile(fileName, data) {
  return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}

function init() {
  inquirer.prompt(questions).then(({ github, color }) => {
    console.log("Searching for user info...");

    api
      .getUser(github)
      .then(response =>
        api.getAllStars(github).then(stars => {
          return generateHTML({
            stars,
            color,
            ...response.data
          });
        })
      )
      .then(html => {
        const conversion = convertFactory({
          converterPath: convertFactory.converters.PDF
        });

        conversion({ html }, function(err, result) {
          if (err) {
            return console.error(err);
          }

          result.stream.pipe(
            fs.createWriteStream(path.join(__dirname, `DeveloperPDF_${color}.pdf`))
          );
          conversion.kill();
        });

        open(path.join(process.cwd(), `DeveloperPDF_${color}.pdf`));
      });
  });
}

init();