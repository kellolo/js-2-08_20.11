const express = require ('express'); // doc Express
const fs = require ('fs'); // doc Node
const cartRouter = require ('./cartRouter');
const handler = require ('./handler')
const app = express ();

app.use (express.json ());
// app.use ('/', express.static ('./dist/public'));
app.use ('/cart', cartRouter);

app.get ('/catalog', (req, res) => {
    fs.readFile ('./src/server/db/catalog.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({ result: 0 }));
        } else {
            res.send (data);
        }
    })
});

app.listen (5000, () => {
    console.log ('server is listening at port 5000');
});