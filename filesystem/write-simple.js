/**
 * Created by Rossy1 on 2018/12/4.
 */
const fs=require("fs");
//写文件
fs.writeFile("target.txt","Hello world",(err)=>{
    if(err){
        throw err
    }
    console.log("文件已保存")
})