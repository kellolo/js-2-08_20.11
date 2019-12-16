let add = (cart, req) => {
    cart.contents.push (req.body)
    return JSON.stringify (cart, null, 4)
}

module.exports = {
    add
}

let change = (cart, req) => {
    let find = cart.contents.find (item => item.id_product === req.id_product)
    find.quantity += req.quantity
    cart.contents.push (req.body)
    return JSON.stringify (cart, null, 4)
}

module.exports = {
    change
}