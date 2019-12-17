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

module.exports = {
  add, remove
}