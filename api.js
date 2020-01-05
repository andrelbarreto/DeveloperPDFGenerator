const axios = require("axios");

require("dotenv").config();

//creates api class to be exported 
const api = {
    getUser(username) {
        return axios 
        .get(`https://api.github.com/users/${username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`)
        .catch(err => {
        // after checking for username if not found logs message indicating it
        console.log(`User not found`);
        process.exit(1);
  });
},
// function to return number of starred repositories using username as part of the api class
getAllStars(username) {
        return axios
        // get call uses username and parameters according to REST API v. 3 - ClientID and ClientSecret are necessary for user permission
        .get(`https://api.github.com/users/${username}/repos?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&per_page=100`
        )
            .then(response => {
                    // After getting user, counts all starred repositories and logs it 
            console.log(response.data)
                return response.data.reduce((acc, curr) => {
             acc += curr.stargazers_count;
        // returns the final acc of stars     
        return acc;
    }, 0);
  });
}
};

module.exports = api;
