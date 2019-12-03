let url = "https://raw.githubusercontent.com/povell/dataJson/master/products.json"

class Product {
    constructor (product) {
        this.title = product.title
        this.id = product.id
        this.img = product.img
        this.cartImg = product.cartImg
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
                        data-cartimage="${this.cartImg}"
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
        fetch(url)
        .then(jsonData => jsonData.json())
        .then(data => {
            data.forEach(product => {
                this.products.push(new Product(product))
            })
        })
        .then(() => this.render())
        .catch((e) => console.log('Error ' + e.message))
    }
    render () {
        let block = document.querySelector (this.block)
        let str = ''
        this.products.forEach (product => {
            str += product.render ()
        })
        block.innerHTML = str
    }
}

let catalog = new Products ('products')

class CartItem {
    constructor (productNode) {
        this.title = productNode.dataset['title']
        this.id = +productNode.dataset['id']
        this.img = productNode.dataset['cartimage']
        this.price = +productNode.dataset['price']
        this.quantity = 1
    }

    getSumm() {
        return this.price * this.quantity
    }
}

class Cart {
    constructor() {
        this.cartItems = [];
    }

    addCartItem(productNode) {
        let find = this.cartItems.find (item => +productNode.dataset['id'] === item.id)
        if(!find)
            this.cartItems.push(new CartItem(productNode))
        else
            find.quantity++

        this.render()
    }

    removeCartItem(productNode) {
        let find = this.cartItems.find(item => +productNode.dataset['id'] === item.id )
        if(find)
        {
            if(find.quantity > 1){
                find.quantity--
            }
            else{
                let index = this.cartItems.indexOf(find)
                this.cartItems.splice(index, 1);
            }
            this.render();
        }
    }

    render() {
        let allProducts = '';
        for (let el of this.cartItems) {
            allProducts += `<div class="cart-item" data-id="${el.id}">
                                <div class="product-bio">
                                    <img src="${el.img}" alt="Some image">
                                    <div class="product-desc">
                                        <p class="product-title">${el.title}</p>
                                        <p class="product-quantity">Quantity: ${el.quantity}</p>
                                        <p class="product-single-price">$${el.price} each</p>
                                    </div>
                                </div>
                                <div class="right-block">
                                    <p class="product-price">${el.getSumm()}</p>
                                    <button class="del-btn" data-id="${el.id}">&times;</button>
                                </div>
                            </div>
                            <div class="bottom-block">`
        }

        allProducts += `<p>Общая сумма: ${this._calculateAllSumm()}</p></div>`

        document.querySelector(`.cart-block`).innerHTML = allProducts;
    }

    _calculateAllSumm() {
        let allSumm = 0;
        this.cartItems.forEach(elem => allSumm += elem.getSumm())
        return allSumm
    }

}
//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
//var userCart = [];
let cart = new Cart()
cart.render()

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
//        removeProduct (evt.target);
        cart.removeCartItem(evt.target);
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
//        addProduct (evt.target);
        cart.addCartItem(evt.target);
    }
})