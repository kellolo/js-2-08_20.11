const express = require ('express')
const fs = require ('fs')
const cartRouter = require ('./cartRouter')
const app = express ()

app.use (express.json ())
app.use ('/', express.static ('public'))
app.use ('/api/cart', cartRouter)

//catalog data serve routing
app.get ('/api/products', (req, res) => {
    fs.readFile ('server/db/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({ result: 0, text: 'err' }))
        } else {
            res.send (data)
        }
    })
})

// app.get ('/api/cart', (req, res) => {
//     fs.readFile ('server/db/userCart.json', 'utf-8', (err, data) => {
//         if (err) {
//             res.sendStatus (404, JSON.stringify ({ result: 0, text: 'err' }))
//         } else {
//             res.send (data)
//         }
//     })
// })

app.listen (3000, () => console.log('azazazaz'))