"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ws_1 = require("ws");
var timers_1 = require("timers");
var app = express();
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var Comment = /** @class */ (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var products = [
    new Product(1, '第一个商品', 1.99, 3.5, '这是第一个商品，我在学习慕课网Angular入门实战时创建的', ['电子商品', '硬件设备']),
    new Product(2, '第二个商品', 2.99, 2.5, '这是第二个商品，我在学习慕课网Angular入门实战时创建的', ['图书']),
    new Product(3, '第三个商品', 3.99, 4.5, '这是第三个商品，我在学习慕课网Angular入门实战时创建的', ['电子商品']),
    new Product(4, '第四个商品', 4.99, 1.5, '这是第四个商品，我在学习慕课网Angular入门实战时创建的', ['硬件设备']),
    new Product(5, '第五个商品', 5.99, 3.5, '这是第五个商品，我在学习慕课网Angular入门实战时创建的', ['电子商品', '硬件设备']),
    new Product(6, '第六个商品', 6.99, 2.5, '这是第六个商品，我在学习慕课网Angular入门实战时创建的', ['图书']),
];
var comments = [
    new Comment(1, 1, '2017-11-22 02:22:22', '张三', 3, '东西不错'),
    new Comment(2, 1, '2017-11-23 02:22:22', '李四', 1, '东西差'),
    new Comment(3, 1, '2017-11-25 02:22:22', '王五', 2, '东西挺好'),
    new Comment(4, 2, '2017-11-24 02:22:22', '赵六', 4, '东西很不错'),
];
app.get('/', function (req, res) {
    res.send("hello express");
});
app.get('/api/products', function (req, res) {
    res.json(products);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (product) {
        return product.id == req.params.id;
    }));
});
app.get('/api/product/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log('服务器已启动，地址是：http://localhost:8000');
});
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (websocket) {
    websocket.send("这个消息是服务器主动推送的");
    websocket.on("message", function (message) {
        console.log("接收到消息: " + message);
    });
});
timers_1.setInterval(function () {
    if (wsServer.clients) {
        wsServer.clients.forEach(function (client) {
            client.send("这是定时推送");
        });
    }
}, 2000);
