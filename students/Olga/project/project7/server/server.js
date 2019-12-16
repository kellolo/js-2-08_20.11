console.log('Check')
const express = require ('express') // doc Express
const fs = require ('fs') //doc Node
const cart = require ('./cartRouter')

const app = express () //объвляем приложение 

app.use (express.json ()) //настройка приложения
app.use ('/', express.static ('public')) //при обращении на сраницу показываем html '/' - ссылка на корневой адрес проекта. Закидывае всю папку с проектом (pablic)

app.get ('/api/catalog', (req, res) => {
    fs.readFile ('server/db/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})



const cartCore = require ('./cart')

app.post ('/api/cart', (req, res) => {
    let file = 'server/db/userCart.json'
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            let oldCart = JSON.parse(data)
            let newCart = cartCore.add (oldCart, req)
            fs.writeFile (file, newCart, (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify ({result: 0}))
                } else {
                    res.sendStatus (JSON.stringify ({result: 1}))
                }
            })
            //res.send (data)
        }
    })
}) 

app.put ('/api/cart', (req, res) => {
    let file = 'server/db/userCart.json'
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            let oldCart = JSON.parse(data)
            let newCart = cartCore.change (oldCart, req)
            fs.writeFile (file, newCart, (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify ({result: 0}))
                } else {
                    res.sendStatus (JSON.stringify ({result: 1}))
                }
            })
            //res.send (data)
        }
    })
}) 


app.listen (8080, () => {
    console.log ('server is listening at port 8080')
})
