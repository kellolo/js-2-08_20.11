const urlProducts = 'https://raw.githubusercontent.com/netproblemmm/js-2-08_20.11/master/students/Yurii%20Yastrebov/project/products.json'

class Product {
    constructor (product) {
        this.title = product.title
        this.id = product.id
        this.image = product.image
        this.cartImage = product.cartImage
        this.price = product.price
    }
    render () {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.image}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-id="${this.id}"
                        data-title="${this.title}"
                        data-image="${this.image}"
                        data-cartimage="${this.cartImage}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`
    }
}

class Products {
    constructor (block, url) {
        this.products = []
        this.block = `.${block}`
        this._makeRequest(url)
    }

    _makeRequest (url) {
        fetch(url)
        .then(data => data.json())
        .then(data => this._init(data))
    }

    _init (list) {
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

let catalog = new Products('products', urlProducts)

class CartItem {
    constructor (product) {
      this.title = product.dataset.title
      this.id = product.dataset.id
      this.img = product.dataset.image
      this.price = product.dataset.price
      this.quantity = 1
    }       
}

class Cart {
    constructor () {
        this.cartItems = [];
    }
    
    addProduct (product) {
        let productId = product.dataset.id
        let find = this.cartItems.find(item => item.id === productId)
        if (!find) {
            this.cartItems.push(new CartItem(product))
        }  else {
            find.quantity++
        }
        this.renderCart()
    }

    removeProduct (product) {
        let productId = product.dataset.id
        let find = this.cartItems.find (item => item.id === productId)
        if (find.quantity > 1) {
            find.quantity--
        } else {
            this.cartItems.splice(this.cartItems.indexOf(find), 1)
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        this.renderCart()
    }

    _calcSumma() {
        let summa = 0;
        this.cartItems.forEach(item => summa += item.quantity * item.price)
        return summa
    }

    renderCart () {
        let allProducts = ''
        this.cartItems.forEach(item => {
            allProducts += `<div class="cart-item" data-id="${item.id}">
                    <div class="product-bio">
                        <img src="${item.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${item.title}</p>
                            <p class="product-quantity">Quantity: ${item.quantity}</p>
                            <p class="product-single-price">$${item.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">${item.quantity * item.price}</p>
                        <button class="del-btn" data-id="${item.id}">&times;</button>
                    </div>
                </div>`
        })
        allProducts += `<p>Общая сумма: ${this._calcSumma()}</p></div>`
        document.querySelector('.cart-block').innerHTML = allProducts
    }
}

let userCart = new Cart();
userCart.renderCart()

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
