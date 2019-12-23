const express = require ('express')// doc express
const fs = require ('fs') // doc Node
const cart = require ('./cartRouter')

const app = express ()

app.use(express.json())
app.use('/', express.static('public'))

app.get('/api/catalog', (req, res) => {
    fs.readFile('server/db/catalog.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0}))
        }
        else {
            res.send(data)
        }
    })
})

app.get('/api/cart', (req, res) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0}))
        }
        else {
            res.send(data)
        }
    })
})

const cartCore = require('./cart')


app.post('/api/cart', (req, res) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
        if(err) {
            res.sendStatus(404, JSON.stringify({result: 0}))
        }
        else {
            let oldCart = data
            let newCart = cartCore.add(oldCart, req)
            fs.writeFile()
        }
    })
})

app.listen(8080, ()=>{
    console.log('server is listenig at port 8080')
})