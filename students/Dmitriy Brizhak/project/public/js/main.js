//сыылка на картинку для корзины
const cartImage = 'https://placehold.it/100x80'
const productImage = 'https://placehold.it/200x150'
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

//каталог
class Product {
    constructor (product) {
        this.title = product.product_name
        this.id = product.id_product
        this.price = product.price
        this.img = productImage
    }
    render () {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} ₽</p>
                        <button class="buy-btn" 
                        data-id="${this.id}"
                        data-title="${this.title}"
                        data-image="${this.img}"
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
        this.render ()  
        this.getJSONPromis()
            .then(d => this.saveNewProducts (d))
            .then(() => this.render())     
    }
    saveNewProducts (date) {
       this.products = date.map( item => new Product (item))
       return date
    }
    getJSONPromis (url) {   
        url = url ? url : API_URL+'/catalogData.json'
        return new Promise (res => { 
            setTimeout (() => {
                //Ждём 1,5 секунды, эмуляция задержки ответа сервера
                return res(url)
            }, 1500)
        })
            .then (url => fetch (url))
            .then (d => d.json())        
    }
    render () {
        if (this.products.length == 0) {
            document.querySelector (this.block).innerHTML = '<h1 class="product-wait">Ожидаем загрузки данных</h1>'
        } else {
            document.querySelector (this.block).innerHTML = this.products.map(item => item.render ()).join('') 
        }
    }
}

//корзина
class CartItem {
    constructor (product) {        
        this.title = product.product_name
        this.id = product.id_product
        this.price = product.price
        this.img= cartImage,
        this.quantity= product.quantity
    }
    productPrice () {
        return this.quantity * this.price
    }
    render () {
        return `<div class="cart-item" data-id="${this.id}">
            <div class="product-bio">
                <img src="${this.img}" alt="Some image">
                <div class="product-desc">
                    <p class="product-title">${this.title}</p>
                    <p class="product-quantity">Quantity: ${this.quantity}</p>
                    <p class="product-single-price">₽${this.price} each</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">${this.productPrice ()}</p>
                <button class="del-btn" data-id="${this.id}">&times;</button>
            </div>
        </div>`
    }
}

class Cart {
    constructor (block) {
        this.userCart = []
        this.block = `.${block}`
        this._init ()
    }
    _init () {
        this.render ()
        this.getJSONPromis('/getBasket.json')
            .then(d => this.saveCart(d))
            .then(() => this.render())          
    }
    getJSONPromis (url, API = API_URL) {
        url = API + url
        return new Promise ((res, rej) => { 
            setTimeout (() => {
                //Ждём 1,5 секунды, эмуляция задержки ответа сервера
                return res(url)
            }, 1000)
        })
            .then (url => fetch (url))
            .then (d => d.json())        
    }
    saveCart (date) {
        this.userCart = date.contents.map( item => new CartItem (item))
        return date
    }
    normalizeProduct (htmlElement) {
        const product = {}
        product.product_name= htmlElement.dataset ['title']
        product.id_product= +htmlElement.dataset['id']
        product.price= +htmlElement.dataset['price']
        product.quantity= 1
        return product
    }
    addProduct (htmlElement) {
        const product = this.normalizeProduct (htmlElement)
        this.getJSONPromis('/addToBasket.json')
            .then(d => {
                if (d.result == 1) {
                    let find = this.userCart.find (element => element.id === product.id_product)
                    if (!find) {    
                        this.userCart.push (new CartItem(product))  
                    }  else {
                        find.quantity++          
                    }
                }
                return d
            })
            .finally(() => this.render ())
        
    }
    removeProduct (htmlElement) {
        this.getJSONPromis('/deleteFromBasket.json')
            .then(d => {
                if (d.result == 1) {
                    let findID =  this.userCart.findIndex(element => element.id === +htmlElement.dataset['id'])
                    if (this.userCart[findID] && this.userCart[findID].quantity > 1) {
                        this.userCart[findID].quantity--
                    } else if (this.userCart[findID]) {
                        this.userCart.splice(findID, 1)          
                    }
                }
                return d
            })
            .finally(() => this.render ())
        
    }
    render () {
        if (this.userCart.length == 0) {
            document.querySelector (this.block).innerHTML = '<div>Корзина пуста</div>'
        } else {
            document.querySelector (this.block).innerHTML = this.userCart.map(item => item.render ()).join('') 
        }
    }
}

const catalog = new Products ('products')
const cart = new Cart (`cart-block`)

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
