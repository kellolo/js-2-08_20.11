let add = (cart, req) => {
  cart.contents.push (req.body)
  return JSON.stringify (cart, null, 4) 
}

let change = (cart, req) => {
  let find = cart.contents.find (el => el.id_product === +req.params.id)
  if (find) {
    find.quantity += +req.body.quantity
    if (find.quantity < 1) cart.contents = cart.contents.filter((element) => element.quantity > 0)
  }
  return JSON.stringify (cart, null, 4)
}

module.exports = {
  add, change
}