let add = (cart, req) => {
    cart.contents.push (req.body)
    return {newCart: JSON.stringify (cart, null, 4), name: req.body.title}
}

let modify = (cart, req) => {
    let find = cart.contents.find (el => el.id === +req.params.id)
    find.quantity += req.body.op
    return {newCart: JSON.stringify (cart, null, 4), name: find.title}
}

let remove = (cart, req) => {
    let find = cart.contents.find (el => el.id === +req.params.id)
    cart.contents.splice (cart.contents.indexOf (find), 1)
    return {newCart: JSON.stringify (cart, null, 4), name: find.title}
}
module.exports = {
    add,
    modify,
    remove
}