//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

class Product {
    constructor(product) {
        this.id_product = product.id_product
        this.product_name = product.product_name
        this.img = product.img || image
        this.price = product.price
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-id="${this.id_product}"
                        data-title="${this.product_name}"
                        data-image="${this.img}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`
    }
}

class Products {
    constructor(block) {
        this.block = `.${block}`
        this.products = []
        this._init()
    }
    _init() {
        makeGETRequest('catalogData.json')
            .then(data => {
                let srcList = JSON.parse(data)
                srcList.forEach(item => {
                    this.products.push(new Product(item))
                })
                this.render()
            })
            .catch(err => {
                console.log(err)
            });
    }
    render() {
        let block = document.querySelector(this.block)
        let str = ''
        this.products.forEach(item => {
            str += item.render()
        })
        block.innerHTML = str
    }
}

let catalog = new Products('products')

class CartItem {

    constructor(product) {
        this.id_product = product.id_product
        this.product_name = product.product_name
        this.img = product.img || cartImage
        this.price = product.price
        this.quantity = product.quantity
    }

    render() {
        return `<div class="cart-item" data-id_product="${this.id_product}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
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
        this.divBlock = `.${block}`
        this.contentCart = []
        this._init()
    }

    _init() {
        makeGETRequest('getBasket.json')
            .then(data => {
                let srcList = JSON.parse(data)
                srcList.contents.forEach(item => {
                    this.contentCart.push(new CartItem(item))
                })
                console.log(this.contentCart)
                this.render()
            })
            .catch(err => {
                console.log(err)
            });
    }

    addProduct(target) {

        let findItem = this.contentCart.find(el => el.id == target.dataset.id)

        if (!findItem) {
            this.contentCart.push(new CartItem(target))
        } else {
            findItem.quantity++
        }

        this.render()
    }

    removeProduct(target) {

        let find = this.contentCart.find(el => el.id == target.dataset.id)

        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.contentCart.splice(this.contentCart.indexOf(find), 1)
        }

        this.render()
    }

    getTotoalSumProducts() {
        let sumProducts = 0
        for (let el of this.contentCart) {
            sumProducts += el.quantity * el.item.price
        }
        return sumProducts
    }

    render() {
        let textCartProducts = ''

        for (let item of this.contentCart) {
            textCartProducts += item.render()
        }

        textCartProducts += 'Total sum: ' + this.getTotoalSumProducts() + '$'
        document.querySelector(this.divBlock).innerHTML = textCartProducts
    }
}

let cart = new Cart('cart-block')

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});

//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('del-btn')) {
        cart.removeProduct(evt.target);
    }
})

//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('buy-btn')) {
        cart.addProduct(evt.target);
    }
})

//создание массива объектов - имитация загрузки данных с сервера
function fetchData() {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push(createProduct(i));
    }
    return arr
};

//создание товара
function createProduct(i) {
    return {
        id: ids[i],
        title: items[i],
        price: prices[i],
        img: image
    }
};

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    resolve(xhr.responseText);
                } else {
                    reject('error server');
                }
            }
        }
        xhr.open('GET', API_URL + url, true);
        xhr.send();
    });
}


