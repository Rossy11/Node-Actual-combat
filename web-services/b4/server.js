/**
 * Created by Rossy1 on 2018/12/6.
 */
const express = require("express");
const morgan = require("morgan");
const nconf = require("nconf"); //配置
const pkg = require("./package.json");
nconf.argv().env("__"); //nconf先读取参数变量，在读取环境变量，__表示对象层级
nconf.defaults({conf: `${__dirname}/config.json`});
nconf.file(nconf.get("conf"));

const app = express();
app.use(morgan("dev")); //记录请求在控制台
app.get("/api/version", (req, res) => {
    res.status(200).send(pkg.version)
})
require("./lib/search")(app, nconf.get("es"));
require("./lib/bundle")(app, nconf.get("es"));
app.use("/api", require("./lib/bundle2")(nconf.get("es")));
app.listen(nconf.get("port"), () => console.log("Ready!"));