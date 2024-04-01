const fs = require('fs')
const filename = '03-read-file-callback.js'
//fs.readfile() expects two argurments: the filename and a callback function
fs.readFile(filename, 'utf8', (err, fileData) => {
    //if there is an error, log it and return
    if(err) return console.error(err)
    console.log(`${filename}: ${fileData.length}`)
})
