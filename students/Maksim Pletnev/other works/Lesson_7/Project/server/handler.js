const cart = require ('./cart')
const fs = require ('fs')

const actions = {
    add: cart.add,
    change: cart.change,
    del: cart.del
}

let handler = (req, res, action, file) => {
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            console.log ('paravozik ne smog')
        } else {
            let newCart = actions [action] (JSON.parse (data), req)
            fs.writeFile (file, newCart, (err) => {
                if (err) {
                    res.sendStatus (404, JSON.stringify ({ result: 0, text: 'err' }))
                } else {
                    res.send ({ result: 1, text: 'success' })
                }
            })
        }
    })
}


module.exports = handler