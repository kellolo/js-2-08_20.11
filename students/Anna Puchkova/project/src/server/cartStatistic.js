const moment = require('moment');
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));

const fs = require('fs');

let cartStatistic = (file, action, product) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log ('Can not read logs...')
            return false;
        } else {
            console.dir(product);
            let newStat = JSON.parse(data);
            let newId = newStat.length;
            let newItem = {
                id: newId,
                date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                action: action,
                id_product: product.id_product,
                product_name: product.product_name
            };
            newStat.push(newItem);
            fs.writeFile(file, JSON.stringify(newStat, null, 4), (err) => {
                if (err) {
                    console.log ('Can not write...')
                    return false;
                }
            });
            return true;
        }
    });

}

module.exports = cartStatistic;