const cart = require ('./cart');
const fs = require ('fs');
const stats = require('./cartStatistic')

const actions = {
    add: cart.add,
    minus: cart.minus,
    plus: cart.plus,
    del: cart.del
};

let handler = (request, response, action, file) => {
    fs.readFile (file, 'utf-8', (err, data) => {
        if (err) {
            response.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {

            let newCart = actions[action](JSON.parse(data), request);
            fs.writeFile(file, newCart, (err) => {
                if (err) {
                    response.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
                    stats('server/db/stats.json', action, request.body.product);
                    response.send({result: 1, text: 'Success'})
                }
            })
        }
    })
}

module.exports = handler;