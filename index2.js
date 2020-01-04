const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const PDFDocument = require('pdfkit');

 
// Create a document
const doc = new PDFDocument();
 
// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));


function promptUser() {
   doc
  .font('fonts/PalatinoBold.ttf')
  .fontSize(25)
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "location",
      message: "Where are you from?"
    },
    {
      type: "input",
      name: "hobby",
      message: "What is your favorite hobby?"
    },
    {
      type: "input",
      name: "food",
      message: "What is your favorite food?"
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn URL."
    }
  ]);
}

function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;npm fu
}

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const html = generateHTML(answers);

    await writeFileAsync("index.html", html);

    console.log("Successfully wrote to index.html");
  } catch(err) {
    console.log(err);
  }
}

doc
.text('PDF Bio Created with Node JS!', 100, 100);
// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('andrelbarreto.jfif', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
  });

  
// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc
.scale(0.6)
.translate(470, -380)
.path('M 250,75 L 323,301 131,161 369,161 177,301 z')
.fill('red', 'even-odd')
.restore();

// Add some text with annotations
doc
.addPage()
.fillColor('blue')
.text('Link to GitHub', 100, 100)
.underline(100, 100, 160, 27, { color: '#0000FF' })
.link(100, 100, 160, 27, 'http://github.com/');

// Finalize PDF file
doc.end();

init();
