'use strict';

const cartImage = 'https://placehold.it/100x80';

const API_URL = 'https://raw.githubusercontent.com/vladovinkin/js-2-08_20.11/master/students/Vladislav%20Ovinkin/project/json';
// /catalogData.json //получить список товаров;
// /getBasket.json //получить содержимое корзины;
// /addToBasket.json //добавить товар в корзину;
// /deleteFromBasket.json //удалить товар из корзины

class List { // список
    // суперкласс для Каталога и Корзины
    constructor (url, container) {
        this.container = container;
        this.url = url;
        // общее
        this.items = []; // массив хранения активных объектов
        this.DTOarr = []; // массив для получения данных
        this._init ();
    }
    _init () {
        return false;
    }
    getJSON (url) {
        return fetch (url)
            .then (d => d.json());
    }
    render () {
        const block = document.querySelector (this.container);
        this.DTOarr.forEach (el => {
            let item = new lists [this.constructor.name] (el);
            this.items.push (item);
            block.insertAdjacentHTML ('beforeend', item.render());
        });
    }
    filter () {
        // потом
    }
}

class ListItem { // элемент списка
    // суперкласс для ProductItem и CartItem
    constructor (el, img = cartImage) {
        this.product_id = el.product_id;
        this.product_name = el.product_name;
        this.price = el.price;
        this.img = el.img;
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
                </div>`;
    }
}

class ProductsList extends List {
    constructor (cart, url = '/catalogData.json', container = '.products') {
        super (url, container);
        this.cart = cart;
    }
    _init () {
        this.getJSON (API_URL + this.url)
            .then (data => {this.DTOarr = data})
            .finally (() => {this.render ()});
    }
}

class CartList extends List {
    constructor (cart, url = '/getBasket.json', container = '.cart-block') {
        super (url, container);
    }
    _init () {
        this.getJSON (API_URL + this.url)
            .then (data => {this.DTOarr = data.contents})
            .finally (() => {this.render ()});
        this.addEventsListeners ();
    }
    addEventsListeners () {
        //кнопка скрытия и показа корзины
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        });

        //кнопки удаления товара из корзины
        document.querySelector('.cart-block').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('del-btn')) {
                this.removeItem (evt.target);
            }
        })
        
        // кнопка добавления товара из каталога в корзину
        document.querySelector('.products').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('buy-btn')) {
                this.addItem (evt.target);
            }
        })
    }
    addItem (product) {
        this.getJSON (`${API_URL}/addToBasket.json`)
            .then (answer => {return answer.result})
            .then (result => {
                this.DTOarr = [];
                if (result == 1) {
                    const id = +product.dataset['product_id'];
                    const find = this.items.find (element => element.product_id === id);
                    if (!find) {
                        product.product_id = id;
                        product.product_name = product.dataset['product_name'];
                        product.price = +product.dataset['price'];
                        product.quantity = 1;
                        this.DTOarr.push (new CartItem (product));
                        this.render ();            
                    } else {
                        find.quantity++;
                        this.reRender ();
                    }
                } else {
                    throw new Error ('Server error adding item!');
                }
            }); 
    }
    removeItem (product) {
        this.getJSON (`${API_URL}/deleteFromBasket.json`)
            .then (answer => {return answer.result})
            .then (result => {
                if (result == 1) {
                    const id = +product.dataset['product_id'];
                    const find = this.items.find (element => element.product_id === id);
                    if (find.quantity > 1) {
                        find.quantity--;
                    } else {
                        this.items.splice (this.items.indexOf (find), 1);
                    }
                    this.reRender ();
                } else {
                    throw new Error ('Server error removing item!')
                }
            });
    }
    reRender () { // в случае, если поменялось только количество - перерисовать корзину
        const block = document.querySelector (this.container);
        block.innerText = "";
        this.items.forEach (el => {
            let item = new lists [this.constructor.name] (el);
            block.insertAdjacentHTML ('beforeend', item.render());
        });
    }
    // _getRequestAdd () {
    //     return makeGETRequestPromise (`${API_URL}/addToBasket.json`);
    // }
    // _getRequestRemove () {
    //     return makeGETRequestPromise (`${API_URL}/deleteFromBasket.json`);
    // }
}

let basket = new CartList ();
let products = new ProductsList (basket);

class ProductItem extends ListItem{ 

}

class CartItem  extends ListItem {
    constructor (el, img = cartImage ) {
        super (el, img);
        this.quantity = el.quantity;
        this.img = img;
    }
    render () {
        return `<div class="cart-item" data-product_id="${this.product_id}">
                        <div class="product-bio">
                            <img src="${this.img}" alt="Some image">
                            <div class="product-desc">
                                <p class="product-title">${this.product_name}</p>
                                <p class="product-quantity">Quantity: ${this.quantity}</p>
                                <p class="product-single-price">$${this.price} each</p>
                            </div>
                        </div>
                        <div class="right-block">
                            <p class="product-price">${this.quantity * this.price}</p>
                            <button class="del-btn" data-product_id="${this.product_id}">&times;</button>
                        </div>
                    </div>`;
    }
}

const lists = { // словарь
    ProductsList: ProductItem,
    CartList: CartItem,
}


// class Product {
//     constructor (product) {
//         this.product_name = product.product_name;
//         this.product_id = product.product_id;
//         this.img = product.img;
//         this.price = product.price;
//     }
//     render () {
//         return `<div class="product-item" data-product_id="${this.product_id}">
//                     <img src="${this.img}" alt="Some img">
//                     <div class="desc">
//                         <h3>${this.product_name}</h3>
//                         <p>${this.price} $</p>
//                         <button class="buy-btn" 
//                         data-product_id="${this.product_id}"
//                         data-product_name="${this.product_name}"
//                         data-image="${this.img}"
//                         data-price="${this.price}">Купить</button>
//                     </div>
//                 </div>`
//     }
// }

// class Products {
//     constructor (block) {
//         this.products = [];
//         this.block = `.${block}`;
//         this._init ();
//     }
//     _init () {
//         this._fetchGoods()
//             .then (data => {this._fillProducts(data)})
//             .then (() => this.render ());
//     }
//     _fetchGoods () {
//         return makeGETRequestPromise (`${API_URL}/catalogData.json`);
//     }
//     _fillProducts (data) {
//         let dataArr = JSON.parse (data);
//         dataArr.forEach (item => {
//             this.products.push (new Product (item));
//         });
//     }  
//     render () {
//         const block = document.querySelector (this.block);
//         let str = '';
//         this.products.forEach (item => {
//             str += item.render ();
//         });
//         block.innerHTML = str;
//     }
// }
// class CartItem {
//     constructor (product) {
//         this.product_id = product.product_id;
//         this.product_name = product.product_name;
//         this.price = product.price;
//         this.img = cartImage;
//         this.quantity = 1;
//     }
// }

// class Cart {
//     constructor (block) {
//         this._addEventsListeners ();
//         this.products = [];
//         this.block = `.${block}`;
//         this._init ();
//     }
//     _init () {
//         this._fetchGoods()
//             .then (data => {this._fillProducts(data)})
//             .then (() => this.render ());
//     }
//     _fetchGoods () {
//         return makeGETRequestPromise (`${API_URL}/getBasket.json`);
//     }
//     _fillProducts (data) {
//         let dataArr = JSON.parse (data);
//         let arr = dataArr.contents;
//         arr.forEach (item => {
//             this.products.push (new CartItem (item)); 
//         });
//     }
//     _addEventsListeners () {
//         document.querySelector('.cart-block').addEventListener ('click', (evt) => {
//             if (evt.target.classList.contains ('del-btn')) {
//                 this.removeItem (evt.target);
//             }
//         })
        
//         document.querySelector('.products').addEventListener ('click', (evt) => {
//             if (evt.target.classList.contains ('buy-btn')) {
//                 this.addItem (evt.target);
//             }
//         })
//     }
//     _getRequestAdd () {
//         return makeGETRequestPromise (`${API_URL}/addToBasket.json`);
//     }
//     _getRequestRemove () {
//         return makeGETRequestPromise (`${API_URL}/deleteFromBasket.json`);
//     }
//     addItem (product) {
//         this._getRequestAdd ()
//             .then (result => {
//                 const answer = JSON.parse(result);
//                 return answer.result;
//             })
//             .then (result => {
//                 if (result == 1) {
//                     const id = +product.dataset['product_id'];
//                     const find = this.products.find (element => element.product_id === id);
//                     if (!find) {
//                         product.product_id = id;
//                         product.product_name = product.dataset['product_name'];
//                         product.price = +product.dataset['price'];
//                         this.products.push (new CartItem (product));
//                     } else {
//                         find.quantity++;
//                     }
//                     this.render ();            
//                 } else {
//                     throw new Error ('Server error adding item!');
//                 }
//             });
//     }
//     removeItem (product) {
//         this._getRequestRemove ()
//             .then (result => {
//                 const answer = JSON.parse(result);
//                 return answer.result;
//             })
//             .then (result => {
//                 if (result == 1) {
//                     const id = +product.dataset['product_id'];
//                     const find = this.products.find (element => element.product_id === id);
//                     if (find.quantity > 1) {
//                         find.quantity--;
//                     } else {
//                         this.products.splice (this.products.indexOf (find), 1);
//                     }
//                     this.render ();
//                 } else {
//                     throw new Error ('Server error removing item!')
//                 }
//             });
//     }
//     render () {
//         this.totalSum = 0;
//         const block = document.querySelector (this.block);
//         let code = '';
//         this.products.forEach (el => {
//             code += `<div class="cart-item" data-product_id="${el.product_id}">
//                         <div class="product-bio">
//                             <img src="${el.img}" alt="Some image">
//                             <div class="product-desc">
//                                 <p class="product-title">${el.product_name}</p>
//                                 <p class="product-quantity">Quantity: ${el.quantity}</p>
//                                 <p class="product-single-price">$${el.price} each</p>
//                             </div>
//                         </div>
//                         <div class="right-block">
//                             <p class="product-price">${el.quantity * el.price}</p>
//                             <button class="del-btn" data-product_id="${el.product_id}">&times;</button>
//                         </div>
//                     </div>`;
//             this.totalSum += el.quantity * el.price;
//         });
//         (this.totalSum) ? code += `<div class='cart-total'>Итого: ${this.totalSum}</div>` : code;
//         block.innerHTML = code;
//     }
// }

// let catalog = new Products ('products');
// let basket = new Cart ('cart-block');

// function makeGETRequestPromise (url) {
//     return new Promise ((res, rej) => {
//         let xhr = new XMLHttpRequest ();
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4) {
//                 if (xhr.status == 200) {
//                     res (xhr.responseText);
//                 }
//                 else {
//                     rej (new Error(`Get data ERROR! Data file: ${url}`));
//                 }
//             }
//         }
//         xhr.open ('GET', url, true);
//         xhr.send ();
//     })
// }