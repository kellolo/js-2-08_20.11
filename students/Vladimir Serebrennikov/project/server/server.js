const express = require('express');
const fs = require('fs');
const cart = require('./cartRouter');

const app = express()

app.use(express.json())
app.use('/', express.static('public'))

app.get('/api/catalog',(req, res) => {
    fs.readFile('server/db/catalog.json', 'utf-8',(err, data) => {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0}))
        } else {
            res.send(data)
        }
    })
})


app.get('/api/cart',(req, res) => {
    fs.readFile('server/db/userCart.json', 'utf-8',(err, data) => {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0}))
        } else {
            res.send(data)
        }
    })
})


const cartCore = require('./cart')

app.post('/api/cart', (req, res) => {

    let file = 'server/db/userCart.json'

    fs.readFile(file, 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0}))
        } else {

            let oldCart = JSON.parse(data)
            let newCartJSON = cartCore.add(oldCart, req)

            fs.writeFile(file, newCartJSON,(err) => {
                if(err) {
                    res.sendStatus(500, JSON.stringify({result: 0}))
                } else {

                    cartCore.writeStats("add", req)
                    res.send(newCartJSON)
                }
            })
        }
    })
})

app.delete('/api/cart', (req, res) => {

    let file = 'server/db/userCart.json'

    fs.readFile(file, 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0}))
        } else {

            let oldCart = JSON.parse(data)
            let newCartJSON = cartCore.remove(oldCart, req)

            fs.writeFile(file, newCartJSON,(err) => {
                if(err) {
                    res.sendStatus(500, JSON.stringify({result: 0}))
                } else {

                    cartCore.writeStats("delete", req)
                    res.send(newCartJSON)
                }
            })
        }
    })
})

app.listen(8080, () => {
    console.log('server is listening at port 8080')
})