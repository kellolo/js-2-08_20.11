const express = require ('express') // doc Express
const fs = require ('fs') //doc Node
const cartModule = require ('./cart')
let cartDB = new cartModule.CartDB()
cartDB.cartInit()

const app = express ()

app.use (express.json ())
app.use ('/', express.static ('public'))

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
    fs.readFile ('server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})


app.post ('/api/cart', (req, res) => {
    cartDB.add(req.body)
    .then((result) => res.sendStatus(200), (err) => res.sendStatus(500))
}) 

app.put('/api/cart', (req, res) => {
    let product = req.body.product
    let mod = req.body.mod
    cartDB.update(product, mod)
    .then((result) => res.sendStatus(200), (err) => res.sendStatus(500))
})

app.delete('/api/cart', (req, res) => {
    let product = req.body
    cartDB.delete(product)
    .then((result) => res.sendStatus(200), (err) => res.sendStatus(500))
})

app.listen (8080, () => {
    console.log ('server is listening at port 8080')
})
