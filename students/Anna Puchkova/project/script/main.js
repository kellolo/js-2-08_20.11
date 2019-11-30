//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];


// Добавьте пустые классы для корзины товаров и элемента корзины товаров. 
// Продумайте, какие методы понадобятся для работы с этими сущностями.
// Добавьте для GoodsList (у меня это Cart) метод, определяющий суммарную стоимость всех товаров.

class Catalog { // каталог всех товаров
    constructor(container = '.products') {
        this.container = container;
        this.allProducts = this._fetchData(); // все товары каталога
        this.add = this.addItem();
        this.render();
    }
    _fetchData () {
        let arr = [];
        for (let i = 0; i < items.length; i++) {
            let productObj = new GoodsItem(i);
            arr.push (productObj);
        }
        return arr;
    }
    render() {
        let list = this.allProducts;
        let arr = [];
        for (let item of list) {
            arr.push(item.createTemplate())
        }
        document.querySelector(this.container).innerHTML = arr.join('');

    }
    addItem() {
        document.querySelector('.products').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('buy-btn')) {
                console.log(evt.target);
                cart.addProduct(evt.target);
            }
        })
    }
}

class Cart {
    constructor(container = '.cart-block') {
        this.container = container;
        this.goods = []; // добавленные в корзину товары       
        this.prices = this._calcCart;
        this.showCart();
        this.removeItem();
    }

    renderCart() { // выводим добавленные в корзину товары
        let allProducts = '';
        for (let el of cart.goods) {
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

        document.querySelector(`.cart-block`).innerHTML = (allProducts.length != 0) ? `${allProducts}<div>Total: ${this._calcCart()}</div>` : `no products, sorry`;
    }
    showCart() { //кнопка скрытия и показа корзины
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        });

    }

	// метод для подсчёта общей суммы товаров
	_calcCart() {
		return this.goods.reduce((sum, elem) => sum + elem.price * elem.quantity, 0);
    }	

    // добавляем товар в корзину this.goods
    addProduct(product) {
        let productId = +product.dataset['id'];
        let find = this.goods.find (element => element.id === productId);
        if (!find) {
            this.goods.push ({
                name: product.dataset ['name'],
                id: productId,
                img: cartImage,
                price: +product.dataset['price'],
                quantity: 1
               
            })

        }  else {
            find.quantity++;
        }
        console.log(`cart:`);  // for testing
        console.log(this.goods);
        this.renderCart();

    }

    removeItem() { // кнопки удаления
        document.querySelector('.cart-block').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('del-btn')) {
                this.removeProduct (evt.target);
            }
        })
    }

    removeProduct (product) {
        let productId = +product.dataset['id'];
        let find = cart.goods.find (element => element.id === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            cart.goods.splice(cart.goods.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        this.renderCart();
    }
    clearCart() {
        // clear cart
    }
}

class GoodsItem {
    constructor (i, image = 'https://placehold.it/200x150') {
        this.id = ids[i],
        this.name = items[i],
        this.price = prices[i],
        this.img = image,
        this.quantity = 0
    }
        createTemplate() {
            return `<div class="product-item" data-id="${this.id}">
                        <img src="${this.img}" alt="Some img"/>
                        <div class="desc">
                            <h3>${this.name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-id="${this.id}"
                            data-name="${this.name}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
        }

        add() {
            this.quantity++
        }
    }

let list = new Catalog();

let cart = new Cart;



/*
//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
var userCart = [];
var list = fetchData ();

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        removeProduct (evt.target);
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        addProduct (evt.target);
    }
})

//создание массива объектов - имитация загрузки данных с сервера
function fetchData () {
    let arr = [];
    for (let i = 0; i < items.length; i++) {
        arr.push (createProduct (i));
    }
    return arr;
};

//создание товара
function createProduct (i) {
    return {
        id: ids[i],
        name: items[i],
        price: prices[i],
        img: image,
        quantity: 0,
        createTemplate: function () {
            return `<div class="product-item" data-id="${this.id}">
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-id="${this.id}"
                            data-name="${this.name}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
        },

        add: function() {
            this.quantity++
        }
    }
};

//рендер списка товаров (каталога)
function renderProducts () {
    let arr = [];
    for (item of list) {
        arr.push(item.createTemplate())
    }
    document.querySelector('.products').innerHTML = arr.join();
}

renderProducts ();

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
*/