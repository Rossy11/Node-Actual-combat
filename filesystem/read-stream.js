/**
 * Created by Rossy1 on 2018/12/4.
 */
//监听文件流的data事件
require("fs").createReadStream(process.argv[2])
    .on("data", chunk => process.stdout.write(chunk))
    .on("error", err => process.stderr.write(`ERROR:${err.message}\n`));