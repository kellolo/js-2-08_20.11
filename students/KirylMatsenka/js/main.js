//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];
let list = fetchData ();
var userCart = [];

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
        list.forEach (item => {
            this.products.push (new Product (item))
        })
        this.render ()
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

// Здесь все просто, создаем и рендерим элемент (объект) корзины
// Все по аналогии как у вас
class CartItem {
    constructor (product) {
        this.id = +product.id
        this.title = product.title
        this.price = +product.price
        this.img = product.img
        this.quantity = product.quantity
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
                        <p class="product-price">$${this.quantity * this.price}</p>
                        <button class="del-btn" data-id="${this.id}">&times;</button>
                    </div>
                </div>`
    }
}

// Здесь все по аналогии как у вас, для добавления и удаления продукта из корзины использую 
// вспомогательный объект
// Получаем селектор корзины
class Cart {
    constructor (block) {
        this.blockClass = `.${block}`
        this.cart = []
    }

    addProduct (productButton) {
        let cartAdapter = new CartAdapter (productButton, this.cart)
        if (!cartAdapter.cartProduct) {
            cartAdapter.product.quantity = 1
            this.cart.push (new CartItem(cartAdapter.product))
        }  else {
            cartAdapter.cartProduct.quantity++
        }
        this._renderCart ()
    }

    removeProduct (productButton) {
        let cartAdapter = new CartAdapter(productButton, this.cart)
        if (cartAdapter.cartProduct .quantity > 1) {
            cartAdapter.cartProduct.quantity--;
        } else {
            this.cart.splice(this.cart.indexOf(cartAdapter.cartProduct), 1);
            document.querySelector(`.cart-item[data-id="${cartAdapter.cartProduct.id}"]`).remove()
        }
        this._renderCart ()
    }

    _renderCart() {
        let allProducts = '';
        this.cart.forEach(item => {
            allProducts += item.render()
        })
        document.querySelector(this.blockClass).innerHTML = allProducts;
    }
}

// Здесь мы получаем кнопку `купить` и по ней находим продукт, и если есть этот продукт в корзине,
// то и его вернем от туда
// Хотел бы у вас спросить: тут когда я пытался сразу в конструкторе вернуть значение, то у меня 
// возвращало только id продукта а не сам продукт, не подскажете почему?
// И как можно назвать этот класс? Или такое название сойдет?
class CartAdapter {
    constructor (button, cart) {
        this.id = +button.dataset['id']
        this.product = this.getProduct ()
        this.cartProduct = this.cartProduct (cart)
    }

    getProduct() {
        return catalog.products.find (product => product.id === this.id)
    }

    cartProduct(cart) {
        return cart.find(cartItem => cartItem.id === this.product.id) 
    }
}

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});

let cart = new Cart('cart-block')

document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        cart.removeProduct (evt.target);
    }
})

document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        cart.addProduct (evt.target);
    }
})


//создание массива объектов - имитация загрузки данных с сервера
function fetchData () {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push (createProduct (i));
    }
    return arr
};

//создание товара
function createProduct (i) {
    return {
        id: ids[i],
        title: items[i],
        price: prices[i],
        img: image,
    }
};

