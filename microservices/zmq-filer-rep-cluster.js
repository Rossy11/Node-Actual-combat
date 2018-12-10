/**
 * Created by Rossy1 on 2018/12/5.
 */
const cluster = require("cluster");
const fs = require("fs");
const zmq = require("zeromq");
const numWorkers = require("os").cpus().length; //Node内置os模块获取CPU数量
if (cluster.isMaster) {
    const router = zmq.socket("router").bind("tcp://127.0.0.1:60401"); //ROUTER监听60404端口，准备接收Tcp链接
    const dealer = zmq.socket("dealer").bind("ipc://filer-dealer.ipc"); //DEALER绑定到进程间的通信（IPC）节点
    router.on("message", (...frames) => dealer.send(frames));
    dealer.on("message", (...frames) => dealer.send(frames));
    cluster.on("online", worker => console.log(`Worker ${worker.process.pid} is oline`));
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork()
    }
} else {
    const responder = zmq.socket("rep").connect("tcp://127.0.0.1:60401");
    responder.on("message", data => {
        const request = JSON.parse(data);
        console.log(`${process.pid} received request for: ${request.path}`);
        fs.readFile(request.path, (err, content) => {
            console.log(`${process.pid} sending response`);
            responder.send(JSON.stringify({
                content: content.toString(),
                timestamp: Date.now(),
                pid: process.pid
            }))
        })
    })
}