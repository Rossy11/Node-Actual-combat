/**
 * Created by Rossy1 on 2018/12/4.
 */
#!/usr/bin/env node
// #!开头，可以在Unix系统中直接运行
//chmod +x cat.js(赋予可执行权限)
//cat.js target.txt(直接运行)
'use strict';
//使用文件流把数据传送到标准输出
require("fs").createReadSrteam(process.argv[2]).pipe(process.stdout);
