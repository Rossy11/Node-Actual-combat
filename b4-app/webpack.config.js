/**
 * Created by Rossy1 on 2018/12/7.
 */
const path = require("path");
const distDir = path.resolve(__dirname, "dist");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
    entry: "./app/index.ts",
    output: { //打包后Bundle文件存储的路径和文件名
        filename: "bindle.js",
        path: distDir
    },
    devServer: { //配置相同的dist目录并修改默认TCP端口号
        contentBase: distDir,
        port: 60800,
        proxy: {
            "/api": "http://localhost:60702",
            "/es": {
                target: "http://localhost:9200",
                pathRewrite: {
                    "^/es": ""
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Better Book Bundle Builder"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    module: {
        rules: [
            { //声明使用ts-loader处理.ts文件
                test: /\.ts$/,
                loader: "ts-loader"
            },
            { //声明使用css-loader和style-loader处理.css文件
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            { //通过url-loader处理各类文件
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader?limit=100000" //limit参数指定能被转换位行内代码的最大文件大小，超过限制使用file-loader复制文件到目录
            }
        ]
    }
}