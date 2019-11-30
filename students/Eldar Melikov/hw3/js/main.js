//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];
const API_URL = 'https://raw.githubusercontent.com/VaGoryainova/js-gb-second-18.09/master/02%20-%20students/%D0%92%D0%B8%D0%BA%D1%82%D0%BE%D1%80%D0%B8%D1%8F%20%D0%93%D0%BE%D1%80%D1%8F%D0%B9%D0%BD%D0%BE%D0%B2%D0%B0/HW/3/async';


//создание массива объектов - имитация загрузки данных с сервера
function onGetError (status) {
    Console.Log('Ошибка! : ' + status);
}

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        debugger;
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    });

    // debugger; 
    // var xhr;

    // if (window.XMLHttpRequest) {
    //   xhr = new XMLHttpRequest();
    // } else if (window.ActiveXObject) { 
    //   xhr = new ActiveXObject("Microsoft.XMLHTTP");
    // }

    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4) {
    //         callback(xhr.responseText);
    //     }
    // }
  
    // xhr.open('GET', url, true);
    // xhr.send();
}

class Product {
    constructor (product) {
        this.title = product.name,
        this.price = product.price,
        this.img = product.img,
        this.id = product.id,
        this.template = `<div class="product-item" data-id="${this.id}">
                            <img src="${this.img}" alt="Some img">
                            <div class="desc">
                                <h3>${this.title}</h3>
                                <p>${this.price} $</p>
                                <button class="buy-btn" 
                                data-id="${this.id}"
                                data-name="${this.title}"
                                data-image="${this.img}"
                                data-price="${this.price}">Купить</button>
                            </div>
                        </div>`
    }
}

class ProductsList {
    constructor () {
        this.products = [];
        this._init ();
        this.cart = new Cart();
    }

    fetchData (responseText) {
        debugger;
        let resp = JSON.parse(responseText);
        resp.forEach(
            product => { this.products.push (new Product(product)) }
        )
        this._render ();
    }

    _init () {
        makeGETRequest (API_URL + '/goods.json', this).then((responseText) => { this.fetchData(responseText) }, (status) => { onGetError(status) });
        document.querySelector ('.products').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('buy-btn')) {
                let productId = +evt.target.dataset['id'];
                let find = this.products.find (element => element.id === productId);
                this.cart.addProduct (find);
            }
        })
    }

    _parseResp (resp) {
        debugger;
        this.products = JSON.parse (resp);
    }

    _render () {
        debugger;
        const block = document.querySelector ('.products');
        this.products.forEach ( product => {
            block.innerHTML += product.template;
        } )
    }
}

class cartItem {
    constructor (product) {
        this.product = product;
        this.quantity = 0;
    }

    getTemplate () {
        return `<div class="cart-item" data-id="${this.product.id}">
                    <div class="product-bio">
                        <img src="${cartImage}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.product.title}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">$${this.product.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">${this.quantity * this.product.price}</p>
                        <button class="del-btn" data-id="${this.product.id}">&times;</button>
                    </div>
                </div>`;
    }
}

class Cart {
    constructor () {
        this.cartItems = [];
        this._init ();
        this._render ();
    }

    _init () {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible')
        });
        document.querySelector ('.cart-block').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('del-btn')) {
                this.removeProduct (evt.target);
            }
        });
    }

    _render () {
        const block = document.querySelector ('.cart-block');
        block.innerHTML = "";
        let sum = 0;
        this.cartItems.forEach (cartItem => {
            sum += cartItem.quantity * cartItem.product.price;
            block.innerHTML += cartItem.getTemplate ();
        });
        block.innerHTML = `<div><p>Total price: ${sum}</p><hr><div>` + block.innerHTML;
        
    }

    addProduct (product) {
        let find = this.cartItems.find (element => element.product.id === product.id);
        if (find) {
            find.quantity++;
        } 
        else {
            find = new cartItem (product);
            find.quantity++;
            this.cartItems.push (find);
        }
        this._render ();
    }

    removeProduct (product) {
        let productId = +product.dataset['id'];
        let find = this.cartItems.find (element => element.product.id === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
        }
        this._render ();
    }
}
//let data = makeGETRequest (API_URL + '/catalogData.json', fetchData) //массив объектов для создания товаров
let list = new ProductsList;
