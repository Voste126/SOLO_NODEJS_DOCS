const fs = require('fs') // Import the fs module for file system operations
const path = require('path') // Import the path module for working with file paths

const targetDirectory = process.argv[2] || './' // Get the target directory from command line arguments or use the current directory

// Call the getFileLengths function with the target directory and a callback function
getFileLengths(targetDirectory, function (err, results) {
    if (err) return console.error(err) // If there's an error, log it to the console
    results.forEach(([file, length]) => console.log(`${file}: ${length}`)) // Iterate through the results and log the file name and length
    console.log('done!') // Log 'done!' when all files have been processed
})

// Function to get the lengths of all files in a directory
function getFileLengths (dir, cb) {
    fs.readdir(dir, function (err, files) { // Read the contents of the directory
        if (err) return cb(err) // If there's an error, pass it to the callback function
        const filePaths = files.map(file => path.join(dir, file)) // Create an array of file paths by joining the directory path with each file name
        mapAsync(filePaths, readFile, cb) // Call the mapAsync function to process each file asynchronously
    })
}

// Function to read the length of a file
function readFile (file, cb) {
    fs.readFile(file, function (err, fileData) { // Read the contents of the file
        if (err) {
            if (err.code === 'EISDIR') return cb(null, [file, 0]) // If the error is due to the file being a directory, pass 0 as the length
            return cb(err) // If there's any other error, pass it to the callback function
        }
        cb(null, [file, fileData.length]) // Pass the file path and length to the callback function
    })
}

// Function to process an array of items asynchronously
function mapAsync (arr, fn, onFinish) {
    let prevError
    let nRemaining = arr.length
    const results = []
    arr.forEach(function (item, i) {
        fn(item, function (err, data) { // Call the provided function for each item in the array
            if (prevError) return // If there's a previous error, do nothing
            if (err) {
                prevError = err // Store the error to prevent further processing
                return onFinish(err) // If there's an error, pass it to the onFinish callback function
            }
            results[i] = data // Store the result in the corresponding position in the results array
            nRemaining-- // Decrement the remaining count
            if (!nRemaining) onFinish(null, results) // If all items have been processed, call the onFinish callback function with the results
        })
    })
}