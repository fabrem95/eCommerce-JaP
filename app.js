const fs = require('fs');
const express = require('express')
const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const JSONapi = (directory, res) => {
        fs.readFile(directory, (err, data) => {
        if (err) throw err;
        let api = JSON.parse(data);
        res.json(api)
    });
}

const saveBuyerData = (data) => {

    fs.writeFile("./server/shopped/compra.txt", data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Archivo creado");
    }); 
} 

// Routes GET
app.get('/categories', function (req, res) {
    JSONapi('./server/category/all.json', res);
})

app.get('/category_info', function (req, res) {
    JSONapi('./server/category/1234.json', res);
})

app.get('/products', function (req, res) {
    JSONapi('./server/product/all.json', res);
})

app.get('/products_info', function (req, res) {
    JSONapi('./server/product/5678.json', res);
})

app.get('/products_comments', function (req, res) {
    JSONapi('./server/product/5678-comments.json', res);
})

app.get('/publish_products', function (req, res) {
    JSONapi('./server/product/publish.json', res);
})

app.get('/cart_info', function (req, res) {
    JSONapi('./server/cart/987.json', res);
})

app.get('/cart_buy', function (req, res) {
    JSONapi('./server/cart/buy.json', res);
})

app.get('/cart_prods', function (req, res) {
    JSONapi('./server/cart/654.json', res)
})

// Routes POST
app.post('/cart', (req, res) => {
    saveBuyerData(JSON.stringify(req.body))
});

// Puerto
app.listen(8080, function() {
    console.log('Escuchando puerto 8080');
})