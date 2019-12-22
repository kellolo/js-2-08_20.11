let add = (cart, req) => {
    cart.contents.push (req.body);
    calcSummary (cart);
    return {newCart: JSON.stringify (cart, null, 4), name: req.body.product_name};
};

let change = (cart, req) => {
    const find = cart.contents.find (cont => cont.product_id === +req.params.id);
    find.quantity += req.body.some;
    calcSummary (cart);
    return {newCart: JSON.stringify (cart, null, 4), name: find.product_name};
};

let remove = (cart, req) => {
    const find = cart.contents.find (cont => cont.product_id === +req.params.id);
    cart.contents.splice (cart.contents.indexOf (find), 1);
    calcSummary (cart);
    return {newCart: JSON.stringify (cart, null, 4), name: find.product_name};
};

calcSummary = (cart) => {
    let sum = 0;
    cart.contents.forEach(element => {
        sum += element.price * element.quantity;    
    });
    cart.countGoods = cart.contents.length;
    cart.amount = sum;
}

module.exports = {
    add, change, remove
}