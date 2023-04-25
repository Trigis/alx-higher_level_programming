const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

request(url, function (error, response, body) {
  if (error) {
    console.error(error);
  } else if (response.statusCode !== 200) {
    console.error('Invalid status code:', response.statusCode);
  } else {
    fs.writeFile(filePath, body, { encoding: 'utf8' }, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log(`The file ${filePath} has been saved!`);
      }
    });
  }
});