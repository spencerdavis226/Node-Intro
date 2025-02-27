// Import Node.js's built-in file system module to work with files
const fs = require('fs');

// Define the 'cat' function that reads a file and prints its contents to the console
function cat(path) {
  // Asynchronously read the file at 'path' using UTF-8 encoding (to interpret the file as text)
  fs.readFile(path, 'utf8', (err, data) => {
    // If an error occurs (for example, the file doesn't exist)
    if (err) {
      // Log an error message that includes the file path
      console.log(`Error reading ${path}`);
      // Log the actual error object to get more details about the error
      console.log(err);
      // Exit the process with a non-zero exit code (1) indicating an error occurred
      process.exit(1);
    }
    // If the file is read successfully, output its content to the console
    console.log(data);
  });
}

// Retrieve the file path from command-line arguments.
// process.argv is an array where:
//   - Index 0: the path to the Node.js executable
//   - Index 1: the path to this script (step1.js)
//   - Index 2: the first argument provided by the user (expected to be the file path)
const filePath = process.argv[2];

// Check if a file path was provided by the user
if (!filePath) {
  // If not, print a usage message indicating the correct way to run the script
  console.error('Usage: node step1.js <file_path>');
  // Exit the process with an error code to indicate incorrect usage
  process.exit(1);
}

// Call the 'cat' function with the provided file path to read and display its content
cat(filePath);
