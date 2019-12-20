const express = require ('express') // doc Express
const fs = require ('fs') //doc Node
const bodyParser = require('body-parser')
//const cart = require ('./cartRouter')

const app = express ()

app.use (express.json ())
app.use ('/', express.static ('dist/public'))
app.use(bodyParser.json())

app.get ('/api/catalog', (req, res) => {
    fs.readFile ('server/db/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

app.get ('/api/cart', (req, res) => {
    fs.readFile ('server/db/cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

const cartCore = require ('./cart')

app.post ('/api/cart', (req, res) => {
    let file = 'server/db/cart.json'
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            res.status (404).send (JSON.stringify ({result: 0}))
        } else {
            let oldCart = JSON.parse(data)
            const item = req.body
            let newCart = cartCore.add (oldCart, item)
            fs.writeFile (file, newCart, (err) => {
                if (err) {
                    res.status (500).send (JSON.stringify ({result: 0}))
                } else {
                    res.status (200).send (JSON.stringify ({result: 1}))
                }
            })
            //res.send (data)
        }
    })
}) 

app.put ('/api/cart', (req, res) => {
    let file = 'server/db/cart.json'
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            res.status (404).send (JSON.stringify ({result: 0}))
        } else {
            let oldCart = JSON.parse(data)
            const item = req.body
            let newCart = cartCore.dell (oldCart, item)
            fs.writeFile (file, newCart, (err) => {
                if (err) {
                    res.status (500).send (JSON.stringify ({result: 0}))
                } else {
                    res.status (200).send (JSON.stringify ({result: 1}))
                }
            })
            //res.send (data)
        }
    })
})

app.listen (8080, () => {
    console.log ('server is listening at port 8080')
})
