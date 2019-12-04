const cartImage = 'https://placehold.it/100x80';
let url_goods = 'https://raw.githubusercontent.com/vilkovaekaterina/online-store-api/master/responses/catalogData.json'


class Product {
    constructor(product) {
        this.title = product.title
        this.id = product.id
        this.img = product.image
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
        // Через FETCH конечно на много приятнее делать
        // _init() {
        //     fetch(url_goods)
        //         .then(d => d.json())
        //         .then(data => { this.products = data })
        //         .finally(() => { this.render()})
        // }
    fetchGoods(url) {
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status == 200) {
                        res(xhr.responseText)
                    } else {
                        rej('server err')
                    }
                }
            }
            xhr.open('GET', url, true);
            xhr.send();
        })
    }

    _init() {
        this.fetchGoods(url_goods)
            .then(dataJSON => JSON.parse(dataJSON))
            .then(data => { this.products = data })
            .then(() => { this.render() })
    }

    render() {
        let block = document.querySelector(this.block)
        let str = ''
        this.products.forEach(item => {
            // debugger;
            str += new Product(item).render()
        })
        block.innerHTML = str
    }
}

let catalog = new Products('products')

class CartItem {
    constructor(product) {
        this.title = product.dataset['title']
        this.id = product.dataset['id']
        this.img = cartImage
        this.price = product.dataset['price']
        this.quantity = 1
    }
    renderCart() {
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
                        <p class="product-price">Full:${this.quantity * this.price} $</p>
                        <button class="del-btn" data-id="${this.id}">&times;</button>
                    </div>
                </div>`
    }
}


let userCart = [];

class Cart {
    constructor(product, block) {
        this.cartProduct = new CartItem(product)
        this.block = `.${block}`
        this.productId = this.cartProduct.id;
        this.totalPrice = 0
        this.cart = userCart
    }
    addProduct() {
        let find = this.cart.find(element => element.id === this.productId);
        if (find) {
            find.quantity++
        } else {
            this.cart.push(this.cartProduct)
        }
        this.fullPrice()
    }
    removeProduct() {
        let find = userCart.find(element => element.id === this.productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            userCart.splice(userCart.indexOf(find), 1);
        }
        this.fullPrice()
    }
    fullPrice() {
        this.cart.forEach(item => {
                this.totalPrice += +item.price * item.quantity
            })
            //console.log(this.totalPrice)
        this.render();
    }
    render() {
        let block = document.querySelector(this.block)
        let str = ''
        block.innerHTML = str
        this.cart.forEach(item => {
            str += item.renderCart()
        })
        str += `<p>Total: ${this.totalPrice} $ </p>`
        block.innerHTML = str
    }
}



let fullCart;

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cartBlock').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cartBlock').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('del-btn')) {
        fullCart = new Cart(evt.target, 'cartBlock').removeProduct();
    }
})


//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('buy-btn')) {
        fullCart = new Cart(evt.target, 'cartBlock').addProduct();
    }
})