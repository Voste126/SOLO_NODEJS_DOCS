const fs = require('fs').promises

printLength('./')

async function printLength(directory) {
    try {
        const fileList = await fs.readdir(directory)

        const results = await Promise.all(
            fileList.map(
            async file => {
                const fileData = await fs.readFile(file)
                return [file, fileData.length]
            }
        )
        )
        
        results.forEach(result => console.log(`${result[0]}: ${result[1]}`))
    }
    catch (err) {
        console.error(err)
    }

}