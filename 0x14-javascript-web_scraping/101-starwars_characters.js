const request = require('request');
const movieId = process.argv[2];
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, function (error, response, body) {
  if (error) {
    console.error(error);
    return;
  }
  const charactersUrls = JSON.parse(body).characters;
  const charactersPromises = charactersUrls.map((url) => new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (error) {
        reject(error);
      } else {
        const character = JSON.parse(body);
        resolve(character.name);
      }
    });
  }));
  Promise.all(charactersPromises)
    .then(characters => console.log(characters.join('\n')))
    .catch(error => console.error(error));
});
We first retrieve the movie ID and the API URL from the command-line arguments, then we send a GET request to the API endpoint with the given movie ID. Once we receive the response, we extract the list of characters' URLs from the response body, and we create an array of promises, where each promise corresponds to a GET request to a character URL. We then use Promise.all to wait for all promises to resolve, and we collect the characters' names in an array. Finally, we print out the names of the characters in the order they are listed in the response.

Save the script in a file named 101-starwars_characters.js and make it executable (chmod +x 101-starwars_characters.js). You can then run it with the movie ID as an argument, like this:

Copy code
./101-starwars_characters.js 3


