const fs = require('fs')

function mapAsync(arr, fn, onFinish){
    let prevError
    let nRemaining = arr.length
    const results = []

    arr.forEach((item, i) => {
        fn(item, (err, data) => {
            if(err) {
                prevError = err
            } else {
                results[i] = data
            }
            nRemaining--
            if(!nRemaining) onFinish(null, results)
        });
    }); // Add closing parenthesis here
}

fs.readdir('./', (err, files)=> {
        if(err) return console.error(err)

        mapAsync(files, fs.readFile, (err, results) => {
            if(err) return console.error(err)

            results.forEach((fileData, i) => {
                console.log(`${files[i]}: ${fileData.length}`)
            })
            console.log('Done!')
        })
    } )// Add closing curly brace here
