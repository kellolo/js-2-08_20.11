//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];
let list = fetchData();
var userCart = [];

class Product {
    constructor(product) {
        this.title = product.title
        this.id = product.id
        this.img = product.img
        this.price = product.price
    }
    render() {
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
    constructor(block) {
        this.products = []
        this.block = `.${block}`
        this._init()
    }
    _init() {
        //list - глобальный массив с заглушками продуктов
        list.forEach(item => {
            this.products.push(new Product(item))
        })
        this.render()
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
    constructor(el) {
        this.title = el.title
        this.id = el.id
        this.img = cartImage
        this.price = el.price
        this.quantity = el.quantity
    }

    render() {
        return `<div class="cart-item" data-id="${this.id}">
        <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
                <p class="product-title">${this.title}</p>
                <p class="product-quantity">Quantity: ${this.quantity}</p>
                <p class="product-single-price">$${this.id} each</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">${this.quantity * this.price}</p>
                <button class="del-btn" data-id="${this.id}">&times;</button>
            </div>
        </div>`
    }
}
let block = document.querySelector(".cart-block")

class Cart {
    constructor(block) {

       this.products = []
        this.block = `.${block}`
    }

    addProduct(product) {
        let productId = +product.dataset['id'];
        let find = userCart.find(element => element.id === productId);
        if (!find) {
            userCart.push({
                title: product.dataset['title'],
                id: +product.dataset['id'],
                img: cartImage,
                price: +product.dataset['price'],
                quantity: 1
            })
        } else {
            find.quantity++
        }
        this.render()
    }

    removeProduct(product) {
        console.log(userCart[0].id)
        let productId = +product.dataset['id'];
        let find = userCart.find(element => element.id === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            userCart.splice(userCart.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        this.render()
    }

    render() {
        userCart.forEach(item => {})
        let str = ''
        userCart.forEach(item => {
            console.log(item)
            item = new CartItem(item)
            str += item.render()
        })
        block.innerHTML = str;
    }
}
let new1 = new Cart();

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('del-btn')) {
        new1.removeProduct(evt.target);
        //removeProduct(evt.target)
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('buy-btn')) {

        new1.addProduct(evt.target);

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
        img: image,
        // quantity: 0,
        // createTemplate: function () {
        //     return `<div class="product-item" data-id="${this.id}">
        //                 <img src="${this.img}" alt="Some img">
        //                 <div class="desc">
        //                     <h3>${this.title}</h3>
        //                     <p>${this.price} $</p>
        //                     <button class="buy-btn" 
        //                     data-id="${this.id}"
        //                     data-title="${this.title}"
        //                     data-image="${this.img}"
        //                     data-price="${this.price}">Купить</button>
        //                 </div>
        //             </div>`
        // },

        // add: function() {
        //     this.quantity++
        // }
    }
};
