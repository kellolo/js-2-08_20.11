const express = require ('express');
const fs = require ('fs');
const cartCore = require ('./cartCore');
const cartRouter = require ('./cartRouter');
const app = express();

app.use (express.json());
app.use ('/', express.static('public'));
app.listen (8080, () => {
    console.log ('server is listening at port 8080');
});

app.get ('/api/catalog', (req, res) => {
    fs.readFile ('server/db/products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0}));
        } else {
            res.send (data);
        }
    });
});

app.get ('/api/cart', (req, res) => {
    fs.readFile ('server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0}));
        } else {
            res.send (data);
        }
    });
});

app.post ('/api/cart', (req, res) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0}));
        } else {
            let newCart = cartCore.add(JSON.parse(data), req);
            fs.writeFile('server/db/userCart.json', newCart, (err) => {
                if (err) {
                    res.sendStatus (500, JSON.stringify({result: 0}));
                } else {
                    res.sendStatus(JSON.stringify({result: 1}));
                }
            });
        };
    });
});

app.put ('/api/cart/:id', (req, res) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify({result: 0}));
        } else {
            let newCart = cartCore.change(JSON.parse(data), req);
            fs.writeFile('server/db/userCart.json', newCart, (err) => {
                if (err) {
                    res.sendStatus (404, JSON.stringify({result: 0}));
                } else {
                    res.sendStatus(JSON.stringify({result: 1}));
                }
            });
        };
    });
});