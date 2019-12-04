
//ссылка ра json-файл массива с продуктами (каталога).
let urlListProducts = 'https://raw.githubusercontent.com/maufaka/home_work/master/products.json';

// // суперкласс для каталога и корзины
// class List {
//     constructor (url, container) {
//         this.container = container
//         this.url = url
//         //общее
//         this.items = [] // актывные объекты
//         this.DTOarr = [] // получение данных
//         this._init ()
//     }
//     _init () {
//         return false
//     }
//     getJSON (url) {
//         return fetch (url)
//         .then(d => d.json ())
//     }
//     render () {
//         const block = document.querySelector (this.container)
//         this.DTOarr.forEach (el => {
//             let item = new lists [this.constructor.name] (el)
//             this.items.push (item)
//             block.insertAdjacentHTML ('beforeend', item.render ())
//         })
        
//     }
//     filter () {
//         //позже
//     }
// }

// class ListItem {
//     constructor (el, img = image) {
//         this.product_name = el.product_name
//         this.prise = el.price
//         this.id_product = el.id_product
//         this.img = img
//     }
//     render () {
//         return `<div class="product-item" data-id="${this.id_product}">
//                         <img src="${this.img}" alt="Some img">
//                         <div class="desc">
//                             <h3>${this.product_name}</h3>
//                             <p>${this.price} $</p>
//                             <button class="buy-btn" 
//                             data-id="${this.id_product}"
//                             data-title="${this.product_name}"
//                             data-image="${this.img}"
//                             data-imagecart="${this.imgCart}"
//                             data-price="${this.price}">Купить</button>
//                         </div>
//                     </div>`
//     }
// }

// class ProductsList extends List {
//     constructor (cart, url = '/catalogData.json', container = '.products') {
//         super (url, container)
//         this.cart = cart
//     }
//     _init () {
        
//     }
// }

// class CartList {

// }

// class ProductItem {

// }

// class CartItem {

// }


//класс продукта
class Product {
    constructor (product) {
        this.title = product.title;
        this.id = product.id;
        this.img = product.image;
        this.imgCart = product.cartImage;
        this.price = product.price;
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
                            data-imagecart="${this.imgCart}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
    }
}

//класс списка продуктов (каталога)
class Products {
    constructor (block, url) {
        this.products = [];
        this.block = `.${block}`;
        this._makeRequest(url);
    }
    _makeRequest (url) {
        fetch (url)
            .then(data => data.json())
            .then(data => this._init(data));
    }
    _init (list) {
        list.forEach (item => {
            this.products.push(new Product(item));
        });
        this.render();
    }
    render () {
        let block = document.querySelector(this.block);
        let str = '';
        this.products.forEach(item => {
            str += item.render();
        });
        block.innerHTML = str;
    }
}

let catalog = new Products('products', urlListProducts);

//класс продукта в корзине
class CartItem {
    constructor (product) {
        this.title = product.title;
        this.id = product.id;
        this.img = product.img;
        this.price = product.price;
        this.quantity = 1;
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
                        </div>`;
    }
}

//класс корзины
class Cart {
    constructor () {
        this.cart = [];
        this.render();
    }
    render () {
        let block = document.querySelector('.cart-block');
        let str = '';
        this.cart.forEach(item => {
            str += item.render();
        });
        block.innerHTML = str;
    }
    addProduct (product) {
        let productId = +product.dataset['id'];
        let find = this.cart.find(element => element.id === productId);
        if (!find) {
            let addproduct = {
                title: product.dataset['title'],
                id: productId,
                img: product.dataset['imagecart'],
                price: +product.dataset['price'],
            }
            this.cart.push(new CartItem(addproduct));
        }  else {
            find.quantity++;
        }
        this.render();
    }
    removeProduct (product) {
        let productId = +product.dataset['id'];
        let find = this.cart.find(element => element.id === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.cart.splice(this.cart.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        this.render();
    }
}

let cart = new Cart();

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});

//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
        cart.removeProduct (evt.target);
    }
});

//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        cart.addProduct (evt.target);
    }
});