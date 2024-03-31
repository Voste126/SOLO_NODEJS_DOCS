/*
This line loads the core http module and store it in a http variable
require() is a globally accessible funtion in node.js that is used to import modules
*/
const http = require('http')

//here we choose the port that we wish to use for our server
const port = process.env.PORT || 3000

/*
http.createserver creates a HTTP servee server object and assigns it to the server. 
it only accepts onr request listener function- which only has a requsrt object (req )and response object(res)
*/
//when building production-ready APIs, it is best to explicit with responses so that customers and clients dont have to handle data in unexpected ways

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
        message: 'Hello Node.js',
        Numbers: [1, 2, 3]
    }))
    })

server.listen(port)
console.log(`Server listening on port ${port}`)