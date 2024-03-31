const fs = require('fs')
const express = require('express')
const EventEmitter = require('events')

const chatEmitter = new EventEmitter()
const port = process.env.PORT || 3000

const app = express()

app.get('/', respondText)
app.get('/json', respondJson)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)
app.get('/chat', respondChat)
app.get('/sse', respondSSE)
app.use(respondNotFound)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

function respondText (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi')
}

function respondJson (req, res) {
    res.json({ text: 'hi', numbers: [1, 2, 3] })
}

function respondEcho (req, res) {
    const { input = '' } = req.query

    res.json({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input
            .split('')
            .reverse()
            .join('')
    })
}

function respondStatic (req, res) {
    const filename = `${__dirname}/public/${req.params[0]}`
    fs.createReadStream(filename)
        .on('error', () => respondNotFound(req, res))
        .pipe(res)
}

function respondChat(req, res) {
    const { message } = req.query

    // Write the chat message to the filesystem
    fs.appendFile('/home/steve/NODE/SOLO_NODEJS_DOCS/01-first-node-api/public/chat.log', message + '\n', (err) => {
        if (err) {
            console.error('Error writing to chat log:', err)
        }
    })

    chatEmitter.emit('message', message)

    // Read previous messages from the chat log
    fs.readFile('/home/steve/NODE/SOLO_NODEJS_DOCS/01-first-node-api/public/chat.log', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading chat log:', err)
            res.end()
        } else {
            // Send previous messages to clients
            res.setHeader('Content-Type', 'text/plain')
            res.end(data)
        }
    })
}

function respondSSE (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    })

    const onMessage = msg => res.write(`data: ${msg}\n\n`)
    chatEmitter.on('message', onMessage)

    res.on('close', function () {
        chatEmitter.off('message', onMessage)
    })
}

function respondNotFound (req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not Found')
}
