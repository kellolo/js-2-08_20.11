//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];
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
        this._init()
    }
    _init () {
        //list - глобальный массив с заглушками продуктов
        list.forEach(item => {
            this.products.push(new Product(item))
        })
        this.render()
    }
    render () {
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
    constructor (product) {
      this.title = product.dataset.title
      this.id = product.dataset.id
      this.img = product.dataset.image
      this.price = product.dataset.price
      this.quantity = 1
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
                    <p class="product-price">${this.quantity * this.price}</p>
                    <button class="del-btn" data-id="${this.id}">&times;</button>
                </div>
            </div>`

    }
}

class Cart {
    constructor () {
        this.cart = []
    }
    renderCart () {
        let allProducts = ""
        this.cart.forEach(item => {
            allProducts += item.render()
        })
        document.querySelector('.cart-block').innerHTML = allProducts
    }

    addProduct (product) {
        let productId = product.dataset.id
        let find = this.cart.find(element => element.id === productId)
        if (!find) {
          let newItem = new CartItem(product)
            this.cart.push(newItem)
        }  else {
            find.quantity++
        }
        this.renderCart()
    }
    removeProduct (product) {
        let productId = product.dataset.id
        let find = this.cart.find (element => element.id === productId)
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.cart.splice(this.cart.indexOf(find), 1)
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        this.renderCart()
    }
}

let userCart = new Cart();

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible')
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains('del-btn')) {
        userCart.removeProduct(evt.target)
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains('buy-btn')) {
        userCart.addProduct(evt.target)
    }
})

//создание массива объектов - имитация загрузки данных с сервера
function fetchData () {
    let arr = []
    for (let i = 0; i < items.length; i++) {
        arr.push(createProduct (i))
    }
    return arr
}

//создание товара
function createProduct (i) {
    return {
        id: ids[i],
        title: items[i],
        price: prices[i],
        img: image,
   }
}

