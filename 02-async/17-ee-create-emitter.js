const http = require('http');
const readline = require('readline');
const querystring = require('querystring');
const { EventEmitter } = require('events');

const r1 = readline.createInterface({ input: process.stdin, output: process.stdout });
r1.on('line', line => 
        http.get(
            `http://localhost:3000/chat?${querystring.stringify({ message: line })}`
        ));

        http.get('http://localhost:3000/sse', res => {
            res.on('data', data => console.log(data.toString()));
        });

function createEventSource(url){
    const source = new EventEmitter();

    http.get(url, res => {
       res.on('data', data =>{
            const message = data
            .toString()
            .replace(/^data: /, '')
            .replace(/\n\n$/, '');
            source.emit('message', message);
       })
    });
    return source;
}

const source = createEventSource('http://localhost:3000/sse');
source.on('message', message => console.log(message));