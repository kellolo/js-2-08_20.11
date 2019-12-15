const cartFile = 'server/db/cart2.json'
const cartApi = '/api/cart'

let add = (cart, req) => {
    cart.contents.push (req.body)
    return JSON.stringify (cart, null, 4)
}

let put = (cart, req) => {
    cart.contents.find (el => el.id === req.body.id).quantity = req.body.quantity
    return JSON.stringify (cart, null, 4)
}

let del = (cart, req) => {
    let indexItem 
     cart.contents.find ((el, i) => {
        el.id === req.body.id ? indexItem = i : null 
    })
    cart.contents.splice (indexItem, 1)
    return JSON.stringify (cart, null, 4)
}

module.exports = {
    add,
    put,
    del,
    cartFile,
    cartApi
}