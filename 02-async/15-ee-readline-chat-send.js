const http = require('http');
const readline = require('readline');
const querystring = require('querystring');

const r1 = readline.createInterface({ input: process.stdin, output: process.stdout });
r1.on('line', line => 
        http.get(
            `http://localhost:3000/chat?${querystring.stringify({ message: line })}`
        ));