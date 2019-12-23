const fs = require ('fs')
const cartCore = require ('./cartModule')
const logCore = require ('./logger')

let getResult = (req, data) => {
    switch (req.method) {
        case 'POST':
            return cartCore.add (JSON.parse (data), req)
        case 'PUT':
            return cartCore.put (JSON.parse (data), req)
        case 'DELETE':
            return cartCore.del (JSON.parse (data), req)
        default:
            console.log (`I can't handle this method: ${req.method}`)
            return null
    }
}

let handle = (req, res) => {
    fs.readFile (cartCore.cartFile, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            let result = getResult (req, data)
            fs.writeFile (cartCore.cartFile, result, (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify ({result: 0}))
                } else {
                    res.send (JSON.stringify ({result: 1}))
                    logCore.log (req)
                }
            })
        }
    })
}

module.exports = {
    handle
}