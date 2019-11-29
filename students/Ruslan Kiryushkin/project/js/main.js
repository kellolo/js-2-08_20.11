//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const API_URL = 'https://raw.githubusercontent.com/RusKir/jslvl2/master'
let list = fetchData();


function makeGETRequest(url, callback) {
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

    class GoodsItem {
        constructor(product_name, price) {
            this.product_name = product_name;
            this.price = price;
        }
        render() {
            return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
        }
    }


    class GoodsList {

        fetchGoods(cb) {
            makeGETRequest('${API_URL}/catalogData.json', (goods) => {
                this.goods = JSON.parse(goods);
                cb();
            })
        }
        // ...
    }

    const list = new GoodsList();
    list.fetchGoods(() => {
        list.render();
    });









    class Product {
        constructor(product) {
            this.product_name = product.product_name
            this.id_product = product.id_product
            this.img = product.img
            this.price = product.price
        }
        render() {
            return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-id="${this.id_product}"
                        data-title="${this.product_name}"
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
        _init() {
            //list - глобальный массив с заглушками продуктов
            list.forEach(item => {
                this.products.push(new Product(item))
            })
            this.render()
        }
        render() {
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
        constructor() {

        }
    }

    class Cart {
        constructor() {

        }
    }
    //глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
    var userCart = [];


    //кнопка скрытия и показа корзины
    document.querySelector('.btn-cart').addEventListener('click', () => {
        document.querySelector('.cart-block').classList.toggle('invisible');
    });
    //кнопки удаления товара (добавляется один раз)
    document.querySelector('.cart-block').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('del-btn')) {
            removeProduct(evt.target);
        }
    })
    //кнопки покупки товара (добавляется один раз)
    document.querySelector('.products').addEventListener('click', (evt) => {
        if (evt.target.classList.contains('buy-btn')) {
            addProduct(evt.target);
        }
    })

    //создание массива объектов - имитация загрузки данных с сервера
    function fetchData() {
        let arr = [];
        for (let i = 0; i < items.length; i++) {
            arr.push(createProduct(i));
        }
        return arr
    };

    //создание товара
    function createProduct(i) {
        return {
            id: ids[i],
            title: items[i],
            price: prices[i],
            img: image,
        }
    };


    // Добавление продуктов в корзину
    function addProduct(product) {
        let productId = +product.dataset['id'];
        let find = userCart.find(element => element.id === productId);
        if (!find) {
            userCart.push({
                name: product.dataset['name'],
                id: productId,
                img: cartImage,
                price: +product.dataset['price'],
                quantity: 1
            })
        } else {
            find.quantity++
        }
        renderCart()
    }

    function getPrices() {
        return this.price * this.quantity
    } //метод для определение суммарной стоимости товаров

    //удаление товаров
    function removeProduct(product) {
        let productId = +product.dataset['id'];
        let find = userCart.find(element => element.id === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            userCart.splice(userCart.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        renderCart();
    }

    //перерендер корзины
    function renderCart() {
        let allProducts = '';
        for (el of userCart) {
            allProducts += `<div class="cart-item" data-id="${el.id_product}">
                            <div class="product-bio">
                                <img src="${el.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${el.product_name}</p>
                                    <p class="product-quantity">Quantity: ${el.quantity}</p>
                                    <p class="product-single-price">$${el.price} each</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">${el.quantity * el.price}</p>
                                <button class="del-btn" data-id="${el.id_product}">&times;</button>
                            </div>
                        </div>`
        }

        document.querySelector(`.cart-block`).innerHTML = allProducts;
    }
