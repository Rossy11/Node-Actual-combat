/**
 * Created by Rossy1 on 2018/12/5.
 */
const zmq = require("zeromq");
const subscriber = zmq.socket("sub");
subscriber.subscribe(""); //告诉∅MQ接受所有消息
subscriber.on("message", data => {
    const message = JSON.parse(data);
    const date = new Date(message.timestamp);
    console.log(`File "${message.file}" changed at ${date}`)
})
subscriber.connect("tcp://localhost:60400"); //建立连接