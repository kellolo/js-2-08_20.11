let add = (cart, req) => {
    cart.contents.push (req.body)
    return {newCart: JSON.stringify (cart, null, 4), name: req.body.product_name}
}

let change = (cart, req) => { //{some: -1}
    let find = cart.contents.find (cont => cont.id_product === +req.params.id) 
    find.quantity += req.body.some //число 1 или -1
    return {newCart: JSON.stringify (cart, null, 4), name: find.product_name}
}

let delItem = (cart, req) => {
    let find = cart.contents.find (cont => cont.id_product === +req.params.id) 
    cart.contents.splice (cart.contents.indexOf (find), 1)
    return {newCart: JSON.stringify (cart, null, 4), name: find.product_name}
}

module.exports = {
    add, change, delItem
}