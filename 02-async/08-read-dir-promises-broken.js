const fs = require('fs').promises

fs.readdir('./')
    .then(files => {
        files.forEach(async file => {
            const fileData = await fs.readFile(file)
            console.log(`${file}: ${fileData.length}`)
        })
        console.log('Done!')
    })
    .catch(console.error)

    