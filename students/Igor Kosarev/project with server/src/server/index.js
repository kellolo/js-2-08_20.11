'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const cartCore = require('./cartCore/cart')

const app = express();
app.use(express.static('dist/public'));

//* сервер
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  //app.set('view engine', 'pug');
  //
let server = app.listen(80, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Application are listening at http://%s:%s", host, port);
})

app.get('/api/catalogData', function(req, res) {
  //res.send(catalogData).end;
  fs.readFile('dist/server/db/aggregates/catalogData.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 }))
    } else(
      res.send(data).end
    )
  });
});

app.get('/api/getBasket', function(req, res) {
  //res.send(basket).end;
  fs.readFile('dist/server/db/aggregates/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 })).end
    } else(
      res.send(data).end
    )
  });
});

app.get('/api/getCart', function(req, res) {
  cartCore.get(req, res)
})

app.get('/api/getHystory', function(req, res) {
  cartCore.getHystory(req, res)
})

app.post('/api/createCart', function(req, res) {
  cartCore.createEvent(req.body, res, "POST")
})

app.put('/api/addCartItem', function(req, res) {
  cartCore.createEvent(req.body, res, "PUT")
})

app.delete('/api/deleteCartItem', function(req, res) {
  cartCore.createEvent(req.body, res, "DELETE")
})

//*функция инициализации
function init() {
  cartCore.aggregate()
}

//* инициализация
init()