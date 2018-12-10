"use strict";
/**
 * Created by Rossy1 on 2018/12/7.
 */
var path = require("path");
var distDir = path.resolve(__dirname, "dist");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
module.exports = {
    entry: "./app/index.ts",
    output: {
        filename: "bindle.js",
        path: distDir
    },
    devServer: {
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
            {
                test: /\.ts$/,
                loader: "ts-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: "url-loader?limit=100000" //limit参数指定能被转换位行内代码的最大文件大小，超过限制使用file-loader复制文件到目录
            }
        ]
    }
};
//# sourceMappingURL=webpack.config.js.map