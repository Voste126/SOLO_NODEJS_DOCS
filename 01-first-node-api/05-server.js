const http = require('http')
const port = process.env.PORT || 3000
const querystring = require('querystring')
const fs = require('fs')

//we create a function that will respond with text
function respondText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello Node.js')
}
//we create a function that will respond with json
function respondJson(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
        message: 'Hello Node.js',
        Numbers: [1, 2, 3]
    }))
}
//we create a function that will respond with a 404 error
function respondNotFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
}

function respondEcho(req, res) {
    const { input = '' } = querystring.parse(
        req.url.split('?').slice(1).join(''))
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
            normal: input,
            shouty: input.toUpperCase(),
            characterCount: input.length,
            backwards: input.split('').reverse().join('')
        }))
    
}
//file serving function
function respondStatic(req, res) {
    const filename = `${__dirname}/public/${req.url.split('/static')[1]}`
    fs.createReadStream(filename)
    .on('error', () => respondNotFound(req, res))
    .pipe(res)
}

const server = http.createServer((req, res) => {
    if (req.url === '/json') return respondJson(req, res)
    if (req.url === '/') return respondText(req, res)
    if (req.url.match(/^\/echo/)) return respondEcho(req, res)
    if (req.url.match(/^\/static/)) return respondStatic(req, res)
    respondNotFound(req, res)
})
server.listen(port)
console.log(`Server listening on port ${port}`)