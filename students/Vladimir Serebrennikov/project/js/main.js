//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
let list = fetchData ();

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


class CartItem {
    constructor (target) {
        this.productId = target.dataset.id
        this.itemProduct = list.find (el => el.id == this.productId)
    }
}

class Cart {

    constructor (block) {
        this.divBlock = `.${block}`
        this.contentCart = []
    }

    addProduct (target) {
        let itemProduct = new CartItem (target).itemProduct
        let find = this.contentCart.find (el => el.id == itemProduct.id)

        if (!find) {
            itemProduct.quantity = 1
            this.contentCart.push (itemProduct)
        }  else {
            itemProduct.quantity++
        }

        this.render ()
    }

    removeProduct (target) {

        let productId = new CartItem (target).productId
        let find = this.contentCart.find (el => el.id == productId)

        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.contentCart.splice(this.contentCart.indexOf(find), 1)
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        
        this.render ()
    }
    
    getTotoalSumProducts () {
        let blockSumProducts = document.createElement("div")
            , sumProducts = 0
        
        for (let el of this.contentCart) {
            sumProducts += el.quantity * el.price 
        }

        blockSumProducts.innerHTML = 'Total sum: ' + sumProducts + '$'

        return blockSumProducts
    }

    render () {
        let allProducts = ''

        for (let el of this.contentCart) {
            allProducts += `<div class="cart-item" data-id="${el.id}">
                                <div class="product-bio">
                                    <img src="${el.img}" alt="Some image">
                                    <div class="product-desc">
                                        <p class="product-name">${el.title}</p>
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
    
        document.querySelector (this.divBlock).innerHTML = allProducts
        document.querySelector (this.divBlock).appendChild (this.getTotoalSumProducts ())
    }
}

let catalog = new Products ('products')
let cart = new Cart ('cart-block')

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
        img: image
    }
};
