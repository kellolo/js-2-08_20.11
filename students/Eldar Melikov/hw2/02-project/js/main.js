//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

//создание массива объектов - имитация загрузки данных с сервера
function fetchData () {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push (createProduct (i));
    }
    return arr;
};

//создание объекта товара
function createProduct (i) {
    return {
        id: ids[i],
        name: items[i],
        price: prices[i],
        img: image,
    }
}
let data = fetchData () //массив объектов для создания товаров

function fetchProducts () {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push (new Product (data [i]));
    }
    return arr;
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
        this._render ();
    }

    _init () {
        this.products = fetchProducts ();
        document.querySelector ('.products').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('buy-btn')) {
                let productId = +evt.target.dataset['id'];
                let find = this.products.find (element => element.id === productId);
                this.cart.addProduct (find);
            }
        })
    }

    _render () {
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

let list = new ProductsList;
