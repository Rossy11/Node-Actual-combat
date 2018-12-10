/**
 * Created by Rossy1 on 2018/12/4.
 */
const fs=require("fs");
//读文件
fs.readFile("target.txt",(err,data)=>{
    if(err){
        throw err
    }
    console.log(data.toString())
})