const cartFile = './dist/server/db/cart2.json'

let add = (cart, req) => {
    cart.contents.push (req.body.product)
    return JSON.stringify (cart, null, 4)
}

let put = (cart, req) => {
    cart.contents.find (el => el.id === +req.params.id).quantity = req.body.product.quantity
    return JSON.stringify (cart, null, 4)
}

let del = (cart, req) => {
    let indexItem 
     cart.contents.find ((el, i) => {
        el.id === +req.params.id ? indexItem = i : null 
    })
    cart.contents.splice (indexItem, 1)
    return JSON.stringify (cart, null, 4)
}

module.exports = {
    add,
    put,
    del,
    cartFile,
}