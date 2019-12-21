'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//заглушки (имитация базы данных)
var image = 'https://placehold.it/200x150';
var cartImage = 'https://placehold.it/100x80';

var API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//const FAKEAPI = 'https://raw.githubusercontent.com/annapuchkova/js-2-08_20.11/master/students/Anna%20Puchkova/other%20works/lesson3';

var List = function () {
    //спиток
    // суперкласс для каталога и корзины
    function List(url, container) {
        _classCallCheck(this, List);

        this.container = container;
        this.url = url;
        //общее
        this.items = []; //массив хранения активных объектов
        this.DTOarr = []; //массив для получения данных
        this._init();
    }

    _createClass(List, [{
        key: '_init',
        value: function _init() {
            return false;
        }
    }, {
        key: 'getJSON',
        value: function getJSON(url) {

            return fetch(url);
            //    .then(d => d.json())
            //    .then(dataArr => dataArr)
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            var block = document.querySelector(this.container);
            this.DTOarr.forEach(function (el) {
                var item = new lists[_this.constructor.name](el);
                _this.items.push(item);
                block.insertAdjacentHTML('beforeend', item.render());
            });
        }
    }, {
        key: 'filter',
        value: function filter() {
            //потом когда-нибудь
        }
    }]);

    return List;
}();

var ListItem = function () {
    // элемент списка
    //суперкласс для ProductItem and CartItem
    function ListItem(el) {
        var img = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : image;

        _classCallCheck(this, ListItem);

        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }

    _createClass(ListItem, [{
        key: 'render',
        value: function render() {
            return '<div class="product-item" data-id="' + this.id_product + '">\n                        <img src="' + this.img + '" alt="Some img"/>\n                        <div class="desc">\n                            <h3>' + this.product_name + '</h3>\n                            <p>' + this.price + ' $</p>\n                            <button class="buy-btn" \n                            data-id="' + this.id_product + '"\n                            data-name="' + this.product_name + '"\n                            data-image="' + this.img + '"\n                            data-price="' + this.price + '">\u041A\u0443\u043F\u0438\u0442\u044C</button>\n                        </div>\n                    </div>';
        }
    }]);

    return ListItem;
}();

var ProductsList = function (_List) {
    _inherits(ProductsList, _List);

    function ProductsList(cart) {
        var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/catalogData.json';
        var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.products';

        _classCallCheck(this, ProductsList);

        var _this2 = _possibleConstructorReturn(this, (ProductsList.__proto__ || Object.getPrototypeOf(ProductsList)).call(this, url, container));

        _this2.cart = cart;
        return _this2;
    }

    _createClass(ProductsList, [{
        key: '_init',
        value: function _init() {
            var _this3 = this;

            this.getJSON(API_URL + this.url).then(function (d) {
                return d.json();
            }).then(function (data) {
                _this3.DTOarr = data;
            });
        }
    }]);

    return ProductsList;
}(List);

var CartList = function (_List2) {
    _inherits(CartList, _List2);

    function CartList() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/getBasket.json';
        var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.cart-block';

        _classCallCheck(this, CartList);

        return _possibleConstructorReturn(this, (CartList.__proto__ || Object.getPrototypeOf(CartList)).call(this, url, container));
    }

    _createClass(CartList, [{
        key: '_init',
        value: function _init() {
            var _this5 = this;

            this.getJSON(API_URL + this.url).then(function (data) {
                _this5.DTOarr = data.contents;
            }).finally(function () {
                _this5.render();
            });
        }
    }]);

    return CartList;
}(List);

var cart = new CartList();
var products = new ProductsList(cart);

var ProductItem = function (_ListItem) {
    _inherits(ProductItem, _ListItem);

    function ProductItem() {
        _classCallCheck(this, ProductItem);

        return _possibleConstructorReturn(this, (ProductItem.__proto__ || Object.getPrototypeOf(ProductItem)).apply(this, arguments));
    }

    return ProductItem;
}(ListItem);

var CartItem = function (_ListItem2) {
    _inherits(CartItem, _ListItem2);

    function CartItem(el) {
        var img = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : cartImage;

        _classCallCheck(this, CartItem);

        var _this7 = _possibleConstructorReturn(this, (CartItem.__proto__ || Object.getPrototypeOf(CartItem)).call(this, el, img));

        _this7.quantity = el.quantity;
        return _this7;
    }

    _createClass(CartItem, [{
        key: 'render',
        value: function render() {
            return '<div class="cart-item" data-id="' + this.id_product + '">\n                                <div class="product-bio">\n                                    <img src="' + this.img + '" alt="Some image">\n                                    <div class="product-desc">\n                                        <p class="product-title">' + this.product_name + '</p>\n                                        <p class="product-quantity">Quantity: ' + this.quantity + '</p>\n                                        <p class="product-single-price">$' + this.price + ' each</p>\n                                    </div>\n                                </div>\n                                <div class="right-block">\n                                    <p class="product-price">' + this.quantity * this.price + '</p>\n                                    <button class="del-btn" data-id="' + this.id_product + '">&times;</button>\n                                </div>\n                            </div>';
        }
    }]);

    return CartItem;
}(ListItem);

var lists = {
    ProductsList: ProductItem,
    CartList: CartItem

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

};