"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.send("hello express");
});
app.get('/products', function (req, res) {
    res.send("接收到商品查询请求!!!aa");
});
var server = app.listen(8000, "localhost", function () {
    console.log('服务器已启动，地址是：http://localhost:8000');
});