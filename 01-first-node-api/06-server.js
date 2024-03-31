//switch to express js
const fs = require('fs')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()

//we create a function that will respond with text
function respondText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello Node.js')
}
//we create a function that will respond with json
function respondJson(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.json({text: 'Hello Node.js', numbers: [1, 2, 3]})
}
//we create a function that will respond with a 404 error
function respondNotFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
}

function respondEcho(req, res) {
    const { input = '' } = req.query
    res.json({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input.split('').reverse().join('')
    })
    
}
//file serving function
function respondStatic(req, res) {
    const filename = `${__dirname}/public/${req.params[0]}`
    fs.createReadStream(filename)
    .on('error', () => respondNotFound(req, res))
    .pipe(res)
}


app.get('/',respondText)
app.get('/json',respondJson)
app.get('/echo',respondEcho)
app.get('/static/*',respondStatic)
app.use(respondNotFound)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})