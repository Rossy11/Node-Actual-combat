/**
 * Created by Rossy1 on 2018/12/5.
 */
const fs = require("fs");
const zmq = require("zeromq");
const responder = zmq.socket("rep");
responder.on("message", data => {
    const request = JSON.parse(data);
    console.log(`Received request to get:${request.path}`)
    fs.readFile(request.path, (err, content) => {
        console.log("Sending response content")
        responder.send(JSON.stringify({
            content: content.toString(),
            timestamp: Date.now(),
            pid: process.pid
        }))
    })
})
responder.bind("tcp://127.0.0.1:60401", err => {
    console.log("Listening for zmq requesters...")
})
//监听SIGINT事件，表示系统收到用户的关闭指令
process.on("SIGINT", () => {
    console.log("Shutting down...")
    responder.close()
})