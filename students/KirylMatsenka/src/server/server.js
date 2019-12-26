const express = require ('express')
const cartRouter = require ('./cartRouter')
const catalogRouter = require ('./catalogRouter')

const app  = express ()

app.use (express.json ())
app.use ('/', express.static ('dist/public'))
app.use ('/cart', cartRouter)
app.use ('/catalog', catalogRouter)

app.listen (8080, () => {
    console.log ('server working')
})