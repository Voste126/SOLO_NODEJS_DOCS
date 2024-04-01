const fs = require('fs').promises;

fs.readdir('./')
/*
after recieving the filelist from fs.readdir 
we use filelist.map to create an array of promises
each promise is then executed in parallel
*/
    .then(FileList => Promise.all(
        FileList.map(file => fs.readFile(file).then(data => [file, data.length]))
    ))
    .then(results => {
        results.forEach(([file, length]) => console.log(`${file}: ${length}`));
        console.log('Done!');
    })
    .catch(err => console.error(err));
