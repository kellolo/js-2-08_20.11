const fs = require('fs')

class CartDB {
    constructor () {
        this.cart = []
        this.amount = 0
        this.countGoods = 0
    }

    cartInit() {
        let dbFile = fs.readFileSync('server/db/userCart.json')
        let objDbFile = JSON.parse(dbFile)
        this.amount = objDbFile.amount
        this.countGoods = objDbFile.countGoods
        this.cart = objDbFile.contents 
    }

    _writeToDB(){
        let newObjDbFile = {}
        newObjDbFile.amount = this.amount
        newObjDbFile.countGoods = this.countGoods
        newObjDbFile.contents = this.cart
        let promise = new Promise(function (resolve, reject) {
            fs.writeFile('server/db/userCart.json', JSON.stringify (newObjDbFile, null, 4), (err) => {
                if (err) {
                    reject("File error")
                } else {
                    resolve(true)
                }
            })
        })
        return promise
    }

    add(product) {
        this.cart.push(product)
        this._logStats(product, "add")
        return this._writeToDB()
    }

    update(product, mod) {
        let find = this.cart.find(item => item.id_product === product.id_product)
        if (mod === '+') {
            find.quantity++
            this._logStats(product, "add")
        }
        else {
            find.quantity--
            this._logStats(product, "del")
        }
        return this._writeToDB()
    }

    delete(product) {
        let find = this.cart.find(item => item.id_product === product.id_product)
        this.cart.splice(this.cart.indexOf(find), 1)
        this._logStats(product, "del")
        return this._writeToDB()
    }

    _logStats(product, operation) {
        let now = new Date()
        let logObj = {
            name: product.product_name,
            price: product.price,
            operation: operation,
            time: now
        }
        fs.appendFile('server/db/stats.json', `${JSON.stringify(logObj, null, 4)},\n`, (err) => {
            if (err) {
                console.log("Ошибка записи статистики!")
            }
        })
    }
}


module.exports = {
    CartDB
}