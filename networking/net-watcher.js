/**
 * Created by Rossy1 on 2018/12/4.
 */
const fs = require("fs");
const net = require("net");
const filename = process.argv[2];
if (!filename) {
    throw Error("Error:No filename specified!")
}
net.createServer(connection => {
    console.log("subscriber connected.")
    connection.write(JSON.stringify({type: "watching", file: filename}) + "\n"); //发送给客户端
    const watcher = fs.watch(filename, () => connection.write(JSON.stringify({type: "changed", timestamp: Date.now()}) + "\n"));
    connection.on("close", () => {
        console.log("subscriber disconnected.")
        watcher.close()
    })
    connection.on("error", () => {
        console.log("Abnormal close")
    });
}).listen(60300, () => console.log("Listening for subscribers..."));