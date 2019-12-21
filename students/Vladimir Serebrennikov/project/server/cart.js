const fs = require('fs');

let add = (cart, req) => {

  let product = req.body

  let findItem = cart.contents.find(el => el.id_product == product.id_product)

  if (!findItem) {
    product.quantity = 1
    cart.contents.push( product )
  } else {
    findItem.quantity++
  }

  getTotoalSum(cart)

  return JSON.stringify(cart, null, 2)
}


let remove = (cart, req) => {

  let product = req.body

  let findItem = cart.contents.find(el => el.id_product == product.id_product)

  if (findItem.quantity && findItem.quantity > 1) {
    findItem.quantity--;
  } else {
    cart.contents.splice(cart.contents.indexOf(findItem), 1)
  }

  getTotoalSum(cart)

  return JSON.stringify(cart, null, 2)
}


function getTotoalSum(cart) {
  cart.amount = 0
  for (let el of cart.contents) {
    cart.amount += el.quantity * el.price
  }
}


let writeStats = (method, req) => {

  let file = 'server/db/statsCartUsers.json'
  
  let text = `${method} id: ${req.body.id_product}, name:  ${req.body.product_name}, date: ${new Date()}\n`;

  fs.appendFile(file, text, (err) => {
    if(err) {
      console.log("don't write stats")
    }
  })
}


module.exports = {
  add, remove, writeStats
}