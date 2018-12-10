/**
 * Created by Rossy1 on 2018/12/6.
 */
const http = require("http");
const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-type": "text/plain"});
    res.end("Hello World\n")
})
server.listen(60700, () => console.log("Ready!"))