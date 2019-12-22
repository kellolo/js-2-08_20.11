const fs = require('fs');

class cartItem {
  constructor(id_product, product_name, price, quantity) {
    this.id_product = id_product
    this.product_name = product_name
    this.price = price
    this.quantity = quantity
  }
}

class cartAgregate {
  constructor() {
    this.amount = 0
    this.countGoods = 0
    this.contents = []
  }
  updateCart(contents) {
    this.contents = contents
    this.amount = 0
    this.countGoods = 0
    for (let i = 0; i < contents.length; i++) {
      this.amount += contents[i].price * contents[i].quantity
      this.countGoods += contents[i].quantity
    }
  }
}

function addItem(event, array) {
  let counter = 0
  for (item of array) {
    if (item.id_product == event.id_product) {
      counter++
    }
  }
  if (counter == 0) {
    let item = new cartItem(event.id_product, event.product_name, event.price, 1)
    array.push(item)
  }
  if (item.id_product == event.id_product) {
    item.quantity++
  }
}

function addItem(event, array) {
  let counter = 0
  for (item of array) {
    if (item.id_product == event.id_product) {
      counter++
    }
  }
  if (counter == 0) {
    let item = new cartItem(event.id_product, event.product_name, event.price, event.quantity)
    array.push(item)
  }
  if (item.id_product == event.id_product) {
    item.quantity += event.quantity
  }
}

function rmItem(event, array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id_product == event.id_product) {
      array[i].quantity -= event.quantity
      if (array[i].quantity < 1) {
        array.splice(i, i)
        if (i === 0) {
          array.splice(0, 1)
        }
      }
    }
  }
}

let createAggregate = () => {
  let promise = new Promise(function(resolve, reject) {
      fs.readFile('db/events/events.json', 'utf-8', (err, data) => {
        if (err) {
          console.log("EventHandler can not read events")
        } else {
          let events = JSON.parse(data)
          let cart = new cartAgregate
          for (let i = 0; i < events.length; i++) {
            switch (events[i].action) {
              case 'POST':
                // cart.contents.push(events[i].event)
                for (item of events[i].event) {
                  cart.contents.push(item)
                }
                break;
              case 'PUT':
                addItem(events[i].event, cart.contents)
                break;
              case 'DELETE':
                rmItem(events[i].event, cart.contents)
                break;
            }
          }
          //console.log(cart)
          cart.updateCart(cart.contents)
          resolve(cart)
        }
      })
    })
    // .then(cart => {
    //   //console.log(cart)
    //   return cart
    // })
    .then(cart => {
      // fs.writeFile("db/aggregates/userCart.json", JSON.stringify(cart), function(err) {
      //   if (err) {
      //     console.log("CEventHandler can not save userCart Aggregate")
      //       //res.sendStatus(404, JSON.stringify({ result: 0 }))
      //   } else {
      //     console.log("Агрегат создан")
      //   }
      // })
      fs.writeFileSync("db/aggregates/userCart.json", JSON.stringify(cart))
        // console.log("Агрегат создан:")
        // console.log(cart)
    })
}



module.exports = {
  createAggregate
}