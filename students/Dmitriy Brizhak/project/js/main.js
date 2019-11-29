//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];


//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
var userCart = [];
const list = fetchData ();

class Product {
    constructor (product) {
        this.title = product.title
        this.id = product.id
        this.img = product.img
        this.price = product.price
    }
    render () {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
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
        //list - глобальный массив с заглушками продуктов
        this.products = list.map( item => new Product (item))
        this.render ()
    }
    render () {
        document.querySelector (this.block).innerHTML = this.products.map(item => item.render ()).join('') 
    }
}

class CartItem {
    constructor (product,productId,cartImage) {
        this.title= product.dataset ['title'],
        this.id= productId,
        this.img= cartImage,
        this.price= +product.dataset['price'],
        this.quantity= 1
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
                    <p class="product-single-price">$${this.price} each</p>
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
    }
    addProduct (product) {
        let productId = +product.dataset['id']
        let find = this.userCart.find (element => element.id === productId)
        if (!find) {    
            this.userCart.push (new CartItem(product,productId,cartImage))
        }  else {
            find.quantity++
        }
        this.render ()
    }
    removeProduct (product) {
        let productId = +product.dataset['id']
        let findID =  this.userCart.findIndex(element => element.id === productId)
        if (this.userCart[findID].quantity > 1) {
            this.userCart[findID].quantity--
        } else {
            this.userCart.splice(findID, 1)          
            //document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        this.render ()
    }
    render () {
        document.querySelector (this.block).innerHTML = this.userCart.map(item => item.render ()).join('') 
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

//создание массива объектов - имитация загрузки данных с сервера
function fetchData () {
    return arr = items.map((item,i) => createProduct (i) )
};

//создание товара
function createProduct (i) {
    return {
        id: ids[i],
        title: items[i],
        price: prices[i],
        img: image
    }
}

//CART

// Добавление продуктов в корзину
function addProduct (product) {
    let productId = +product.dataset['id'];
    let find = userCart.find (element => element.id === productId);
    if (!find) {
        userCart.push ({
            name: product.dataset ['name'],
            id: productId,
            img: cartImage,
            price: +product.dataset['price'],
            quantity: 1
        })
    }  else {
        find.quantity++
    }
    renderCart ()
}

//удаление товаров
function removeProduct (product) {
    let productId = +product.dataset['id'];
    let find = userCart.find (element => element.id === productId);
    if (find.quantity > 1) {
        find.quantity--;
    } else {
        userCart.splice(userCart.indexOf(find), 1);
        document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
    }
    renderCart ();
}

//перерендер корзины
function renderCart () {
    let allProducts = '';
    for (el of userCart) {
        allProducts += `<div class="cart-item" data-id="${el.id}">
                            <div class="product-bio">
                                <img src="${el.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${el.name}</p>
                                    <p class="product-quantity">Quantity: ${el.quantity}</p>
                                    <p class="product-single-price">$${el.price} each</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">${el.quantity * el.price}</p>
                                <button class="del-btn" data-id="${el.id}">&times;</button>
                            </div>
                        </div>`
    }

    document.querySelector(`.cart-block`).innerHTML = allProducts;
}
