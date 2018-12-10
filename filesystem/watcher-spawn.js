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
    ls.stdout.pipe(process.stdout); //把子进程的输出内容直接传送到标准输出流
});
console.log(`Now watching ${filename} for changes...`);