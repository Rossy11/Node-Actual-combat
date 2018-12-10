/**
 * Created by Rossy1 on 2018/12/3.
 */
const fs = require("fs");
fs.watch("target.txt", () => console.log("File changed!"));
console.log("开始监听...");