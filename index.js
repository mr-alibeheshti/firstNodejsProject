
const { Console } = require('console');
const fs = require('fs');
const http = require('http');
const url = require('url');
const replace = require('./modules/replace');
const tempCard = fs.readFileSync(`${__dirname}/templates/cards-template.html`,'utf-8');
const alldata = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');
const productData = JSON.parse(alldata);
const server = http.createServer((req, res) => {
    const path = req.url;
    const {pathname, query} = url.parse(path,true);
    if (path == "/" || pathname == "/overview") {
        const cardsData = productData.map(ele => replace(tempCard,ele)).join('');
        const final = tempOverview.replace('{%PRODUCT_CARDS}',cardsData);
        res.end(final);
    } else if (pathname == '/product') {
        const productId = productData[query.id]
        console.log(query.id)
        const productSinglePage = replace(tempProduct,productId);
        res.end(productSinglePage);
    } else if (pathname == "/api") {
        res.writeHead(200,{
            'content-type' : 'application/json'
        })
        res.end(alldata);
    } else {
        res.writeHead(404);
        res.end("404");
    }
})
server.listen(8001, '127.0.0.1', () => {
    console.log("server listen now");
})