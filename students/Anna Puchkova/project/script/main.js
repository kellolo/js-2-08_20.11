//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

//const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API_URL = 'https://raw.githubusercontent.com/annapuchkova/js-2-08_20.11/master/students/Anna%20Puchkova/other%20works/lesson3';

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
  }*/

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

  /*  fetchGoods (cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
          })
    }*/
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


/*list.fetchGoods(() => {
    list.render();
  });*/
  



