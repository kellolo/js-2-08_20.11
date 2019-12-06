
class Product {
    constructor(product) {
        this.title = product.item
        this.id = product.id
        this.img = product.img
        this.imgCart = product.imgCart
        this.price = product.price
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" data-id="${this.id}">Купить</button>
                    </div>
                </div>`
    }
}

class Products {
    constructor(block) {
        this.products = []
        this.block = `.${block}`
    }
    init(json) {
        for (let el of json) {
            let newProduct = new Product(el);
            this.products.push(newProduct);
        }
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

fetch("https://raw.githubusercontent.com/belyaeff/js-2-08_20.11/master/catalogData.json")
.then(response => response.json())
.then(json => catalog.init(json));

class CartItem {
    constructor(id, img, imgCart, title, price, quantity) {
        this.id = id;
        this.img = img;
        this.imgCart = imgCart;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }

    render() {
        return `<div class="cart-item" data-id="${this.id}">
                    <div class="product-bio">
                        <img src="${this.imgCart}" alt="Some image">
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
    constructor() {
        this.cart = [];
    }

    addItem(target, catalog) {
        let productId = +target.dataset.id;
        let find = this.cart.find(elem => elem.id === productId);
        if (!find) {
            // Убрал дата аттрибуты(кроме id), тут продукт по которому кликнули ищется в обьекте каталог
            let clickedItem = catalog.products.find(elem => elem.id === productId);
            console.log(clickedItem, productId)
            let newCartItem = new CartItem(clickedItem.id, clickedItem.img, clickedItem.imgCart, clickedItem.title, clickedItem.price, 1);
            this.cart.push(newCartItem);
        } else {
            find.quantity++;
        }
        this.renderCart();
    }

    removeItem(target) {
        let productId = +target.dataset.id;
        let find = this.cart.find(elem => elem.id === productId);
        if(find.quantity > 1) {
            find.quantity--;
        } else {
            this.cart.splice(this.cart.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
        }
        this.renderCart()
    }

    renderCart() {
        let stringHtml = "";
        for (let el of this.cart) {
            stringHtml += el.render();
        }

        document.querySelector(".cart-block").innerHTML = stringHtml;
    }
}

let userCart = new Cart();

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('del-btn')) {
        userCart.removeItem(evt.target);
    }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('buy-btn')) {
        userCart.addItem(evt.target, catalog);
    }
})

//создание массива объектов - имитация загрузки данных с сервера
// function fetchData() {
//     let arr = [];
//     for (let i = 0; i < items.length; i++) {
//         arr.push(createProduct(i));
//     }
//     return arr
// };

// //создание товара
// function createProduct(i) {
//     return {
//         id: ids[i],
//         title: items[i],
//         price: prices[i],
//         img: image,
        // quantity: 0,
        // createTemplate: function () {
        //     return `<div class="product-item" data-id="${this.id}">
        //                 <img src="${this.img}" alt="Some img">
        //                 <div class="desc">
        //                     <h3>${this.name}</h3>
        //                     <p>${this.price} $</p>
        //                     <button class="buy-btn" 
        //                     data-id="${this.id}"
        //                     data-name="${this.name}"
        //                     data-image="${this.img}"
        //                     data-price="${this.price}">Купить</button>
        //                 </div>
        //             </div>`
        // },

        // add: function() {
        //     this.quantity++
        // }
//     }
// };

//рендер списка товаров (каталога)
// function renderProducts () {
//     let arr = [];
//     for (item of list) {
//         arr.push(item.createTemplate())
//     }
//     document.querySelector('.products').innerHTML = arr.join();
// }

// renderProducts ();

//CART

// Добавление продуктов в корзину
// function addProduct(product) {
//     let productId = +product.dataset['id'];
//     let find = userCart.find(element => element.id === productId);
//     if (!find) {
//         userCart.push({
//             name: product.dataset['name'],
//             id: productId,
//             img: cartImage,
//             price: +product.dataset['price'],
//             quantity: 1
//         })
//     } else {
//         find.quantity++
//     }
//     renderCart()
// }

//удаление товаров
// function removeProduct(product) {
//     let productId = +product.dataset['id'];
//     let find = userCart.find(element => element.id === productId);
//     if (find.quantity > 1) {
//         find.quantity--;
//     } else {
//         userCart.splice(userCart.indexOf(find), 1);
//         document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//     }
//     renderCart();
// }

//перерендер корзины
// function renderCart() {
//     let allProducts = '';
//     for (el of userCart) {
//         allProducts += `<div class="cart-item" data-id="${el.id}">
//                             <div class="product-bio">
//                                 <img src="${el.img}" alt="Some image">
//                                 <div class="product-desc">
//                                     <p class="product-title">${el.name}</p>
//                                     <p class="product-quantity">Quantity: ${el.quantity}</p>
//                                     <p class="product-single-price">$${el.price} each</p>
//                                 </div>
//                             </div>
//                             <div class="right-block">
//                                 <p class="product-price">${el.quantity * el.price}</p>
//                                 <button class="del-btn" data-id="${el.id}">&times;</button>
//                             </div>
//                         </div>`
//     }

//     document.querySelector(`.cart-block`).innerHTML = allProducts;
// }