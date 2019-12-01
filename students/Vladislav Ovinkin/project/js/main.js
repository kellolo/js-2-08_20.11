'use strict';

const cartImage = 'https://placehold.it/100x80';

const API_URL = 'https://raw.githubusercontent.com/vladovinkin/js-2-08_20.11/master/students/Vladislav%20Ovinkin/project/json';
// /catalogData.json //получить список товаров;
// /getBasket.json //получить содержимое корзины;
// /addToBasket.json //добавить товар в корзину;
// /deleteFromBasket.json //удалить товар из корзины

class Product {
    constructor (product) {
        this.product_name = product.product_name;
        this.product_id = product.product_id;
        this.img = product.img;
        this.price = product.price;
    }
    render () {
        return `<div class="product-item" data-product_id="${this.product_id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-product_id="${this.product_id}"
                        data-product_name="${this.product_name}"
                        data-image="${this.img}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`
    }
}

class Products {
    constructor (block) {
        this.products = [];
        this.block = `.${block}`;
        this._init ();
    }
    _init () {
        this._fetchGoods()
            .then (data => {this._fillProducts(data)})
            .then (() => this.render ());
    }
    _fetchGoods () {
        return makeGETRequestPromise (`${API_URL}/catalogData.json`);
    }
    _fillProducts (data) {
        let dataArr = JSON.parse (data);
        dataArr.forEach (item => {
            this.products.push (new Product (item));
        });
    }  
    render () {
        const block = document.querySelector (this.block);
        let str = '';
        this.products.forEach (item => {
            str += item.render ();
        });
        block.innerHTML = str;
    }
}
class CartItem {
    constructor (product) {
        this.product_id = +product.dataset ['product_id'];
        this.product_name = product.dataset ['product_name'];
        this.price = +product.dataset['price'];
        this.img = cartImage;
        this.quantity = 1;
    }
}

class Cart {
    constructor (block) {
        this.products = [];
        this.block = `.${block}`;
        this.totalSum = 0;
    }
    addItem (product) {
        const id = +product.dataset['product_id'];
        const find = this.products.find (element => element.product_id === id);
        if (!find) {
            this.products.push (new CartItem (product));
        } else {
            find.quantity++;
        }
        this.render ();
    }

    removeItem (product) {
        const id = +product.dataset['product_id'];
        const find = this.products.find (element => element.product_id === id);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.products.splice (this.products.indexOf (find), 1);
        }
        this.render ();
    }

    render () {
        this.totalSum = 0;
        const block = document.querySelector (this.block);
        let code = '';
        this.products.forEach (el => {
            code += `<div class="cart-item" data-product_id="${el.product_id}">
                        <div class="product-bio">
                            <img src="${el.img}" alt="Some image">
                            <div class="product-desc">
                                <p class="product-title">${el.product_name}</p>
                                <p class="product-quantity">Quantity: ${el.quantity}</p>
                                <p class="product-single-price">$${el.price} each</p>
                            </div>
                        </div>
                        <div class="right-block">
                            <p class="product-price">${el.quantity * el.price}</p>
                            <button class="del-btn" data-product_id="${el.product_id}">&times;</button>
                        </div>
                    </div>`;
            this.totalSum += el.quantity * el.price;
        });
        (this.totalSum) ? code += `<div class='cart-total'>Итого: ${this.totalSum}</div>` : code;
        block.innerHTML = code;
    }
}

let catalog = new Products ('products');
let basket = new Cart ('cart-block');

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});

//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        basket.removeItem (evt.target);
    }
})

//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        basket.addItem (evt.target);
    }
})

function makeGETRequest (url) {
    let xhr;

    xhr = new XMLHttpRequest ();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                return xhr.responseText;
            }
            else {
                console.log ('Server error!');
            }
        }
    }

    xhr.open ('GET', url, true);
    xhr.send ();
}

function makeGETRequestPromise (url) {
    return new Promise ((res, rej) => {
        let xhr = new XMLHttpRequest ();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status == 200) {
                    res (xhr.responseText);
                }
                else {
                    rej ('Server error!');
                }
            }
        }
        xhr.open ('GET', url, true);
        xhr.send ();
    })
}

// makeGETRequestPromise (`${API_URL}/e-shop_items.json`)
//     .then (data => JSON.parse (data))
//     .then (a => console.log (a));