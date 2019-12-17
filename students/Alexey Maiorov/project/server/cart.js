let add = (cart, req) => {
    cart.contents.push (req.body)
    return JSON.stringify (cart, null, 4)
}

let modify = (cart, req) => {
    let find = cart.contents.find (el => el.id === req.body.id)
    find.quantity = req.body.quantity + 1
    return JSON.stringify (cart, null, 4)
}

let remove = (cart, req) => {
    let find = cart.contents.find (el => el.id === req.body.id)
    find.quantity > 1 ? find.quantity = req.body.quantity - 1 : cart.contents.splice (cart.contents.indexOf(find), 1)
    return JSON.stringify (cart, null, 4)
}
module.exports = {
    add,
    modify,
    remove
}