/**
 * Created by Rossy1 on 2018/12/3.
 */
const fs = require("fs");
const spawn = require("child_process").spawn;
const filename = process.argv[2];
if (!filename) {
    throw Error("A file to watch must be specified!")
}
fs.watch(filename, () => {
    const ls = spawn("ls", ["-l", "-h", filename]); //ls命令
    let output = "";
    ls.stdout.on("data", chunk => output += chunk); //暂存子进程输出流的数据
    //监听子进程退出事件
    ls.on("close", () => {
        const parts = output.split(/\s+/);
        console.log([parts[0], parts[4], parts[8]]); //权限、大小、文件名
    })
});
console.log(`Now watching ${filename} for changes...`);