'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const fs = require('fs');
const cartCore = require('./cartCore/cart')

const app = express();
app.use(express.static('public'));

//*имитация БД
const basketContents = [{
    id_product: 1,
    product_name: "Ноутбук",
    price: 45600,
    quantity: 1
  },
  {
    id_product: 2,
    product_name: "Мышка",
    price: 1000,
    quantity: 1
  }
]

//* класс корзины
class Basket {
  constructor() {
    this.amount = 0
    this.countGoods = 0
    this.contents = []
  }
  updateBasket(contents) {
    this.contents = contents
    this.amount = 0
    this.countGoods = 0
    for (let i = 0; i < contents.length; i++) {
      this.amount += contents[i].price * contents[i].quantity
      this.countGoods += contents[i].quantity
    }
  }
}


//let basket = new Basket(46600, 2, basketContents)
let basket = new Basket()

//*функция инициализации
function init() {
  // let test = {
  //   id_product: 2,
  //   product_name: "Мышка",
  //   price: 1000,
  //   quantity: 10
  // }
  // cartCore.createEvent(test, 0, "DELETE")

  cartCore.aggregate()
  basket.updateBasket(basketContents)
}


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
  fs.readFile('db/aggregates/catalogData.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 }))
    } else(
      res.send(data).end
    )
  });
});

app.get('/api/getBasket', function(req, res) {
  //res.send(basket).end;
  fs.readFile('db/aggregates/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0 })).end
    } else(
      res.send(data).end
    )
  });
});



app.post('/api/updateBasket', function(req, res) {
  //console.log(req.body);
  //basket.contents = req.body;
  basket.updateBasket(req.body)
    //* выводим в лог состояние корзины при изменении (для целей проверки)
  console.log(basket);
  console.log("_____________");
  res.send('ok').end
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



//* инициализация
init()