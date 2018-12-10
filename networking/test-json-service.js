/**
 * Created by Rossy1 on 2018/12/4.
 */
const server = require("net").createServer(connection => {
    console.log("subscriber connected.")
    const firstChunk = '{"type":"changed","timesta';
    const secondChunk = 'mp":1450694370094}\n';
    connection.write(firstChunk);
    const timer = setTimeout(() => {
        connection.write(secondChunk);
        connection.end();
    }, 100)
    connection.on("end", () => {
        clearTimeout(timer);
        console.log("subscriber disconnected.")
    })
    connection.on("error", () => {
        console.log("Abnormal close")
    });
})
server.listen(60300, () => {
    console.log("The test server listening for subscribers...")
})