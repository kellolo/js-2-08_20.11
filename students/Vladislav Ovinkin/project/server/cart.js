let add = (cart, req) => {
    cart.contents.push (req.body);

    return {newCart: JSON.stringify (cart, null, 4), name: req.body.product_name};
};

let change = (cart, req) => {
    const find = cart.contents.find (cont => cont.product_id === +req.params.id);
    find.quantity += req.body.some;

    return {newCart: JSON.stringify (cart, null, 4), name: find.product_name};
};

let remove = (cart, req) => {
    const find = cart.contents.find (cont => cont.product_id === +req.params.id);
    cart.contents.splice (cart.contents.indexOf (find), 1);

    let { amount, countGoods } = this.calcSummary (cart);
    
    return {newCart: JSON.stringify (cart, null, 4), name: find.product_name};
};

let calcSummary = (cart) => {
    return { amount: 1, countGoods: 0};
}

module.exports = {
    add, change, remove
}