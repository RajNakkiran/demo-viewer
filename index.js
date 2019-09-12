// index.js

//
//  WEBSOCKET  RECEIVER SIDE. Only one client supported !!! Last connection wins. 
//

const WebSocket = require('ws')
const Websocket_port = 8080;
const wss = new WebSocket.Server({port: Websocket_port})
var saved_ws = false;

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Websocket Server Received message => ${message}`)
    })

    ws.send('hello from websocket server on connection event')
    saved_ws = ws;
})

//
// HTTP SENDER SIDE - Many clinets can send LOG messages 
//
const http = require('http')
const port = 80

// CALL =  http://localhost:3000/?AWS=RAJ&DEVICE=NAKKIRAN&QT=NONE&CAS=GETCERT
// OUTPUT:  { AWS: 'RAJ', DEVICE: 'NAKKIRAN', QT: 'NONE', CAS: 'GETCERT' }
var params = function (req) {
    let q = req.url.split('?'), result = {};
    if (q.length >= 2) {
        q[1].split('&').forEach((item) => {
            try {
                result[item.split('=')[0]] = item.split('=')[1];
            } catch (e) {
                result[item.split('=')[0]] = '';
            }
        })
    }
    return result;
}

const requestHandler = (request, response) => {
    let args = params(request);
    if (args.LOG && saved_ws) {
        saved_ws.send(args.LOG);
        console.log(args.LOG);
    }
    response.end('OK');
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`HTTP SENDER side server is listening on ${port}.  Websocket RECEIVER side  server is listening on ${Websocket_port}`)
})


