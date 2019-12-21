let add = (cart, req) => {
    cart.contents.push(req.body)
    return JSON.stringify(cart, null, 4)
}

module.exports = {
    add
}