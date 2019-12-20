const cart = require ('./cart')
const fs = require ('fs')
const logger = require ('./logger')

const actions = {
    add: cart.add,
    change: cart.change,
    del: cart.delItem
}

let handler = (req, res, action, file) => {
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            let oldCart = JSON.parse(data)
            let {newCart, name} = actions [action] (oldCart, req)
            fs.writeFile (file, newCart, (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify ({result: 0}))
                } else {
                    res.send (JSON.stringify ({result: 1}))
                    logger (action, name)
                }
            })
        }
    })
}

module.exports = handler