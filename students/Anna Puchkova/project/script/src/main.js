//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const FAKEAPI = 'https://raw.githubusercontent.com/annapuchkova/js-2-08_20.11/master/students/Anna%20Puchkova/other%20works/lesson3/catalogData.json';

//import catalog from './catalog.js'

const app = new Vue({
    el: '#app',
    data: {
        catalogURL: FAKEAPI,
        products: null,
        cart: null,
        cartImage: 'https://placehold.it/100x80',
        image: 'https://placehold.it/200x150',
        cartVisible: false,
        catalogVisible: false,
        total: null,
        error: '',
        filteredProducts: null,
        searchLine: ''

    },
    mounted () {
        this.getJSON(this.catalogURL)
        .then(d => this.products = d)
    },
    methods: {
        cartShown() {
            this.cartVisible = !this.cartVisible;
        },
        getJSON(url) {
            return fetch(url)
            .then(result => result.json())
        },
        addItem(event) {
            let item = this.products.find((el) => el.id_product == event.target.dataset["id"]);
            item.quantity = typeof(item.quantity) === 'undefined' ? 1 : ++item.quantity;
            this.cart = this.products.filter(el => typeof(el.quantity) != 'undefined' && el.quantity > 0);
        },
        removeItem(event) {
            let item = this.products.find((el) => el.id_product == event.target.dataset["id"]);
            item.quantity--;
            this.cart = this.products.filter(el => typeof(el.quantity) != 'undefined' && el.quantity > 0);
        },
        counter() {
            this.total = this.cart.reduce((sum, elem) => sum + elem.price * elem.quantity, 0);
        }
       filterProd() {   
            if (this.products != null)
                this.filteredProducts = this.products.filter(el => el.name.toUpperCase() == (this.searchStr == "" ? el.name.toUpperCase() : this.searchStr.toUpperCase()))
        },
        showMessage (text) {
            this.catalogVisible = true;
            this.error = text;
        },
    }
  /*  components: {
        'catalog': catalog
    }*/
});


/*

class List { //спиток
    // суперкласс для каталога и корзины
    constructor(url, container) {
        this.container = container;
        this.url = url;
        //общее
        this.items = []; //массив хранения активных объектов
        this.DTOarr = []; //массив для получения данных
        this.filteredGoods = []; //массив для хранения фильтрованных данных
        this._init();
    }
    _init() {
        return false;
    }
    getJSON(url) {
       return  fetch(url)
           .then(d => d.json())
    }
    render() {
        const block = document.querySelector(this.container);
        this.DTOarr.forEach(el => {
            let item = new lists[this.constructor.name](el);
            this.items.push(item);
            block.insertAdjacentHTML ('beforeend', item.render ());
        })
    }
    filter(value) {// тут будет фильтрация
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.items.filter(good => regexp.test(good.product_name));
        this.render();
    }
}

class ListItem { // элемент списка
//суперкласс для ProductItem and CartItem
    constructor(el, img = image) {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
        this.quantity = product.quantity || 1;
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                        <img src="${this.img}" alt="Some img"/>
                        <div class="desc">
                            <h3>${this.product_name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-id="${this.id_product}"
                            data-name="${this.product_name}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
    }
}

class ProductsList extends List{
    constructor(cart, url = '/catalogData.json', container = '.products') {
        super (url, container);
        this.cart = cart;
    }
    _init () {
        this.getJSON (FAKEAPI + this.url)
            .then (data => {this.DTOarr = data})
            .finally (() => {
                this.render ()
            })
    }
}

class CartList extends List{
    constructor(url = '/getBasket.json', container = '.cart-block') {
        super (url, container);
        this.amount = 0;
    }
    _init() {
       this.getJSON(API_URL + this.url)
       .then(data => {
           this.DTOarr = data.contents;
           this.amount += data.amount;
        })
        .finally(() => {
            this.render();
        })

    }
}

let cart = new CartList();
let products = new ProductsList(cart);

class ProductItem extends ListItem {

}
class CartItem extends ListItem {
    constructor(el, img = cartImage) {
        super (el, img);
        this.quantity = el.quantity;
    }
    render() {
       return `<div class="cart-item" data-id="${this.id_product}">
                                <div class="product-bio">
                                    <img src="${this.img}" alt="Some image">
                                    <div class="product-desc">
                                        <p class="product-title">${this.product_name}</p>
                                        <p class="product-quantity">Quantity: ${this.quantity}</p>
                                        <p class="product-single-price">$${this.price} each</p>
                                    </div>
                                </div>
                                <div class="right-block">
                                    <p class="product-price">${this.quantity * this.price}</p>
                                    <button class="del-btn" data-id="${this.id_product}">&times;</button>
                                </div>
                            </div>`
    }
}

const lists = {
    ProductsList: ProductItem,
    CartList: CartItem
}

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
})*/
// поле поиска
document.querySelector('.btn-search').addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filter(value);
  });
/*function makeGETRequest(url, callback) {
    let xhr;
  
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.responseText);
      }
    }
  
    xhr.open('GET', url, true);
    xhr.send();
  }
class GoodsItem {
    constructor (name, price, id) {
        this.id = id,
        this.product_name = name,
        this.price = price,
        this.img = image,
        this.quantity = 0
    }
    render() {
        {
            return `<div class="product-item" data-id="${this.id}">
                        <img src="${this.img}" alt="Some img"/>
                        <div class="desc">
                            <h3>${this.product_name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-id="${this.id}"
                            data-name="${this.product_name}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
        }
    }
}

class Catalog { // каталог всех товаров
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; // все товары каталога
        this.add = this.addItem();
        this._init()
    }
    _init() {
        fetch(`${API_URL}/catalogData.json`)
          .then(d => d.json())
          .then(data => {
            data.forEach(good => {
              this.goods.push(new GoodsItem(good.product_name, good.price, good.id_product))
            })
          })
          .finally(() => this.render())
      }

   fetchGoods (cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
          })
    }
  render() {

        let listHtml = '';
        this.goods.forEach(good => {  
          listHtml += good.render();
        });
        document.querySelector(this.container).innerHTML = listHtml;
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
let list = new Catalog();

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

        document.querySelector(`.cart-block`).innerHTML = `${allProducts}<div>Total: ${this._calcCart()}</div>`;
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

let cart = new Cart;

ist.fetchGoods(() => {
    list.render();
  });*/
  
