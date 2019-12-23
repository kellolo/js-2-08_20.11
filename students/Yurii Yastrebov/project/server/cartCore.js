let add = (cartCore, req) => {
    cart.contents.push(req.body)
    return JSON.stringify(cart, null, 4)
}

let update = (cartCore, req) => {
    let find = cart.contents.find(item => item.id === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    update
}