const express = require('express');
const fd = require('fs')//
const app = express();//врубаем вторую 

app.use(express.jaon());
app.use('/', express.static('pablic'))//static() -модуль возвращающий статические файлы.

app.get('/api/products', (req, res)=> {
    fs.readFile('server/db/products.json', 'utf8', (err, data)=>{
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));//sendStatus() модуль позволяет в случае ошибки отправить текст и код 
        }else{
            res.send(data);
        }
    })
})
app.get('/api/cart', (req, res)=> {
    fs.readFile('server/db/products.json', 'utf8', (err, data)=>{
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));//sendStatus() модуль позволяет в случае ошибки отправить текст и код 
        }else{
            res.send(data);
        }
    })
})
app.post('/api/cart', (req, res)=> {
    fs.readFile('server/db/userCart.json', 'utf8', (err, data)=>{
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));//sendStatus() модуль позволяет в случае ошибки отправить текст и код 
        }else{
            let newCart = cart.add(JSON.parse(data), req);
            fs.writeFile(`server/db/userCart.json`, newCart, (err)=>{
                if(err){
                    res.send(JSON.stringify({result:0, text: err}))
                }else{
                    res.send(JSON.stringify({result:0, text: 'Успех'}));
                    
                }
            })
        }
    })
})
//app.get()
// app.get('/', (req, res)=>{
//     res.send('Hello World!');
// });
// app.get('/api/users', (req, res)=>{
//     res.send(JSON.stringify([
//         {name:'Some1'},
//         {name:'Some2'},
//         {name:'Some3'},
//     ]))
// });
// app.get('/api/users/:id', (req, res)=>{
//     res.send(req.param.id);
// });
app.listen(3000, ()=>{
    return console.log('Listening on port ...3000')
})