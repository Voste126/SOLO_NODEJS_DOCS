let count = 0
setInterval(() => console.log(`${count++}`), 1000)

setTimeoutSync(5000)
console.log('Timeout!')
process.exit()

function setTimeoutSync(ms){
    const t0 = Date.now()
    while (Date.now() - t0 < ms) {}
}
