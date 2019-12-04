const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

class Product {
    constructor (product) {
        this.id_product = product.id_product
        this.product_name = product.product_name
        this.img = product.img || image
        this.price = product.price
    }
    render () {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-id_product="${this.id_product}"
                        data-product_name="${this.product_name}"
                        data-img="${this.img}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`
    }
}
class Products {
    constructor (block) {
        this.products = []
        this.block = `.${block}`
        this._init ()
    }
    _init () {
        makeGETRequest('catalogData.json')
        .then((data) => {
            let listSrcProducts = JSON.parse(data)
            listSrcProducts.forEach (item => {
                this.products.push(new Product(item))
            })

            this.render()
        })
        .catch((err) => {
            console.log(err)
        });
    }
    render () {
        let block = document.querySelector (this.block)
        let str = ''
        this.products.forEach (item => {
            str += item.render ()
        })
        block.innerHTML = str
    }
}

let catalog = new Products ('products')

class CartItem {
    constructor(item) {
        this.id_product = item.id_product
        this.product_name = item.product_name
        this.img = item.img || cartImage
        this.price = item.price
        this.quantity = 1
    }
    render() {
        return `<div class="cart-item" data-id_product="${this.id_product}">
                    <div class="product-bio">
                        <img src="${this.img || cartImage}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-name">${this.product_name}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">$${this.quantity * this.price}</p>
                        <button class="del-btn" data-id_product="${this.id_product}">&times;</button>
                    </div>
                </div>`        
    }
}

class Cart {
    constructor(block) {
        this.divBlock = `.${block}`;
        this.contentCart = [];
        this._init()
    }
    _init () {
        makeGETRequest('getBasket.json')
        .then((data) => {
            let listSrcCart = JSON.parse(data)
            listSrcCart.contents.forEach(item => {
                this.contentCart.push(new CartItem(item))
            })
            this.render()
        })
        .catch((err) => {
            console.log(err)
        });
    }
    addProduct(target) {
        let findItemInCart = this.contentCart.find( el => el.id_product == target.dataset.id_product)
        let newItem = catalog.products.find( el => el.id_product == target.dataset.id_product)

        if (!findItemInCart) {
            this.contentCart.push( new CartItem(newItem) )
        } else {
            findItemInCart.quantity++
        }
        this.render()
    }
    removeProduct(target) {
        let find = this.contentCart.find (el => el.id_product == target.dataset.id_product)
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.contentCart.splice(this.contentCart.indexOf(find), 1)
        }
        this.render ()
    }
    getTotoalSum() {
        let sumProducts = 0
        for (let el of this.contentCart) {
            sumProducts += el.quantity * el.price 
        }
        return 'Total sum: ' + sumProducts + '$'
    }
    render () {
        let textCartProducts = ''
        for (let item of this.contentCart) {
            textCartProducts += item.render()
        }
        textCartProducts += this.getTotoalSum()
        document.querySelector(this.divBlock).innerHTML = textCartProducts
    }
}

let cart = new Cart('cart-block')

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});

//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        cart.removeProduct (evt.target);
    }
})

//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        cart.addProduct (evt.target);
    }
})

function makeGETRequest(url) {
    return new Promise ((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status == 200 ) {
                    resolve(xhr.responseText);
                } else {
                    reject("xhr: error server");
                }
            }
        }
        xhr.open('GET', API_URL + url, true);
        xhr.send();
    });
}