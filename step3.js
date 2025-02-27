const fs = require('fs');
const axios = require('axios');

function outputContent(content) {
  if (outputFile) {
    fs.writeFile(outputFile, content, 'utf8', (err) => {
      if (err) {
        console.error(`Couldn't write to ${outputFile}`);
        console.error(err);
        process.exit(1);
      }
    });
  } else {
    console.log(content);
  }
}

function cat(path) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading ${path}`);
      console.log(err);
      process.exit(1);
    }
    outputContent(data);
  });
}

function webCat(url) {
  axios
    .get(url)
    .then((response) => {
      outputContent(response.data);
    })
    .catch((err) => {
      console.error(`Error fetching ${url}`);
      console.error(err);
      process.exit(1);
    });
}

let outputFile;
let input;

if (process.argv[2] === '--out') {
  outputFile = process.argv[3];
  input = process.argv[4];
} else {
  input = process.argv[2];
}

if (!input) {
  console.error('Usage: node step3.js [--out output_file] <file_path_or_URL>');
  process.exit(1);
}

if (input.startsWith('http')) {
  webCat(input);
} else {
  cat(input);
}
