let count = 0
setInterval(() => console.log(`${count++}`), 1000)

setTimeout(() => {
    console.log('Timeout!')
    process.exit()
}, 5000)