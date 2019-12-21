const express = require ('express')
const fs = require ('fs')
const cartRouter = require ('./cartRouter')

const app = express ()

app.use (express.json ())
app.use ('/', express.static ('public'))
app.use ('/api/cart', cartRouter)

app.get('/api/catalog', (req, res) => {
    fs.readFile('dist/server/db/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});

app.listen (8080, () => {
    console.log ('server is listening at port 8080')
})
