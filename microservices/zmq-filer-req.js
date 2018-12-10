/**
 * Created by Rossy1 on 2018/12/5.
 */
const zmq = require("zeromq");
const filename = process.argv[2];
const requester = zmq.socket("req");
requester.on("message", data => {
    const response = JSON.parse(data);
    console.log("Received response:", response)
})
requester.connect("tcp://localhost:60401");
console.log(`Sending a request for ${filename}`);
requester.send(JSON.stringify({path: filename}));