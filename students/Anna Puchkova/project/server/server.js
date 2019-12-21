const express = require ('express'); // doc Express
const fs = require ('fs'); //doc Node
const cartRouter = require ('./cartRouter');
const app = express ();

app.use (express.json ());
app.use ('/', express.static ('public'));

app.use('/api/cart', cartRouter);
app.get('/api/products', (req, res) => {
  fs.readFile('./server/db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({result: 0, text: err}));
      // res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening ${port} port`);
});

/*app.post ('/api/cart', (req, res) => {
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
}) */

app.listen (8080, () => {
    console.log ('server is listening at port 8080')
})

