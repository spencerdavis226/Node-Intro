const fs = require('fs');
const axios = require('axios');

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading ${path}`);
      console.log(err);
      process.exit(1);
    }
    console.log(data);
  });
}

function webCat(url) {
  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.error(`Error fetching ${url}`);
      console.error(err);
      process.exit(1);
    });
}

const input = process.argv[2];

if (!input) {
  console.error('Usage: node step1.js <file_path_or_URL>');
  process.exit(1);
}

if (input.startsWith('http')) {
  webCat(input);
} else {
  cat(input);
}
