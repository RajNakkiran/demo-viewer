


1:  Start SERVER
c:\t19\demo-viewer>node index.js
HTTP SENDER side server is listening on 3000.  Websocket RECEIVER side  server is listening on 8080


2: Start Receiver Page
file:///C:/t19/demo-viewer/receiver/index.html

3: Test
curl http://localhost/?LOG=CAS:Cert-issued
curl http://localhost/?LOG=QTR:external
curl http://localhost/?LOG=DEV:embeeded
curl http://localhost/?LOG=AWS:Just


NOT USED:
process.EventEmitter = require('events').EventEmitter; // add this line first !!!
var sq = require('simplequeue');   // https://github.com/ajlopez/SimpleQueue
var queue = sq.createQueue();
queue.putMessage( args.LOG );
const newmessage = queue.getMessageSync(); // null if no message
