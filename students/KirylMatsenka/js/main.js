//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

const FAKEAPI = 'https://raw.githubusercontent.com/KirylJazzSax/js-2-08_20.11/js_lvl_2_expression/students/KirylMatsenka/json'
const LOCALFAKEAPI = 'http://localhost:82/my'

class List { //список
    //суперкласс для Каталога и Корзины
    constructor (url, container) {
        this.container = container
        this.url = url
        //общее
        this.items = [] //массив хранения активных объектов
        this.DTOarr = [] //массив для получения данных
        this._init ()
    }
    _init () {
        return false
    }
    getJSON (url) {
        return fetch (url)
            .then (d => d.json())
    }
    render () {
        const block = document.querySelector (this.container)
        this.DTOarr.forEach (el => {
            let item = new lists [this.constructor.name] (el)
            this.items.push (item)
            block.insertAdjacentHTML ('beforeend', item.render ()) 
        })
    }
    filter () {
        //потом
    }
}

class ListItem { //эл-т списка
    //суперкласс для ProductItem и CartItem

    constructor (el, img = image) {
        this.name = el.name
        this.price = el.price
        this.id = el.id
        this.img = img
    }
    render () {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-id="${this.id}"
                        data-title="${this.name}"
                        data-image="${this.img}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`
    }
}


class ProductsList extends List {
    constructor (cart, url = '/catalog.json', container = '.products') {
        super (url, container)
        this.cart = cart
    }
    _init () {
        this.getJSON (FAKEAPI + this.url)
            .then (data => {this.DTOarr = data})
            .finally (() => {
                this.render ()
            })
    }
}


class CartList extends List {
    constructor (url = '/cart2.json', container = '.cart-block') {
        super (url, container)
    }
    _init () {
        this.getJSON (FAKEAPI + this.url)
        .then (data => {this.DTOarr = data.contents})
            .finally (() => {
                this.render ()
            })
    }

    // Переопределили метод render чуть из родительского
    render () {
        const block = document.querySelector (this.container)
        // Это пока что самый простой способ для перерендера корзины
        block.innerHTML = ''
        // Это самый простой способ для обновления массива items из объекта List
        this.items = []
        this.DTOarr.forEach (el => {
            let cartItem = new CartItem (el)
            this.items.push (cartItem)            
            block.insertAdjacentHTML ('beforeend', cartItem.render ())             
        })
    }
}

let cartList = new CartList ()
let products = new ProductsList (cartList)

class ProductItem extends ListItem {

}

class CartItem extends ListItem {
    constructor (el, img = cartImage) {
        super (el, img)
        this.quantity = el.quantity
    }

    render () {
        return `<div class="cart-item" data-id="${this.id}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.product}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">${this.quantity * this.price}</p>
                        <button class="del-btn" data-id="${this.id}">&times;</button>
                    </div>
                </div>`
    }
}

// Объект для добавления товара в корзину и удаления
// Я понимаю что мы будем тут работать с сервером но я решил просто что-нибудь сделать
// Буду рад комментариям! 
class Cart {
    constructor (target) {
        // Это кнопка на которую мы нажали
        this.target = target
    }
    // По ней находим продукт в корзине
    getCartItem () {
        return cartList.DTOarr.find((cartItem) => +cartItem.id == +this.target.dataset['id'])
    }
    // Это просто продукт из каталога
    getProductItem () {
        return products.DTOarr.find ((item) => +item.id == +this.target.dataset['id'])
    }
    // Метод добавления
    addGood () {
        let cartItem = this.getCartItem ()
        if (cartItem) {
            cartItem.quantity++
        } else {
            let productItem = this.getProductItem ()
            if (productItem) {
                productItem.quantity = 1
                cartList.DTOarr.push (productItem)
            } else {
                console.log ('Неудалось добавить товар в корзину(')
            }
        }
        cartList.render ()
    } 
    // Метод удаления
    removeGood () {
        let cartItem = this.getCartItem ()
        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1
        } else {
            cartList.DTOarr.splice (cartList.DTOarr.indexOf (this.getCartItem ()), 1)
        }
        cartList.render ()
    }
}

const lists = {
    ProductsList: ProductItem,
    CartList: CartItem
}

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        (new Cart (evt.target)).removeGood ();
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        (new Cart (evt.target)).addGood ();
    }
})
