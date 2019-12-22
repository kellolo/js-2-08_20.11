
const express = require('express');
const fs = require('fs');
const app = express();
const cart = require('./cartRouter');

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/cart', cart); 

app.get('/api/products', (request, response) => {
    fs.readFile('server/db/products.json','utf-8', (error, data) => {
       if (error) {
           response.sendStatus(404, JSON.stringify({result: 0, text: error}));
       }
       else {
           response.send(data);
       }
    });
});


// http://localhost:8080/
app.listen( 8080 , () => {
    console .log( 'server is listening at port 8080' );
});
