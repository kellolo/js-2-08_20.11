let add = (cart, item) => {
    let find =  cart.contents.find (element => element.id_product === item.id_product)
    if (!find) {  
        cart.contents.push (item)
    }  else {
        find.quantity++        
    }
    return JSON.stringify (cart, null, 4)
}

let dell = (cart, item) => {
    let findID =  cart.contents.findIndex(element => element.id_product === item.id_product)
        if (cart.contents[findID] && cart.contents[findID].quantity > 1) {
            cart.contents[findID].quantity--
        } else if (cart.contents[findID]) {
            cart.contents.splice(findID, 1)          
        }
    return JSON.stringify (cart, null, 4)
}

module.exports = {
    add,
    dell
}