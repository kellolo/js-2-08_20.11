
const cartImage = 'https://placehold.it/100x80'
const image = 'https://placehold.it/200x150'
// const FAKEAPI = 'https://raw.githubusercontent.com/invector4ik002/myJSON/master'
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
//пилим босса
const app = new Vue({
   el: '#app',
    data: {
    //ProductsComponent <= cartImage:`https://placehold.it/100x80`,//картинка товара в корзинке.
    //ProductsComponent <= image:`https://placehold.it/200x150`,//картинка товара в каталоге.
    //ProductsComponent <= catalogUrl:`/catalogData.json`,//ссылка на url для каталога.
    cartUrl:`/getBasket.json`,//ссылка для url для корзинки.
    //ProductsComponent <=DTOarr:[],//фокус массив для каталога.
    //ProductsComponent <= items:[],//фокус массив для перенесенных.
    //ProductsComponent <= filtered:[],//фокус массив после поисков
    //    userSearch:'',//странная херня
    //ProductsComponent <= shoeCart: false,//метод инвизибЫл ))
    },
    methods: {//методы Vue
        getJSON(url){//первая функция это получение и обработка данных с сервера
            return fetch(url)//собственно метод
               .then(d => d.json())//получили обработали в джинсон
               .catch(error => console.log(error))//упал сервак держи
        },
    }
})
        // addProduct(product){
        //     this.getJSON(`${API}/addToBasket.json`)
        //     .then(data => {
        //         if(data.d){
        //             let find = this.items.find(el => el.id_product === product.id_product);
        //             if(find){
        //                 find.quantity++;
        //             }else{
        //                 let prod = Object.assign({quantity: 1},product);
        //                 this.items.push(prod);
        //             }
        //         }else{
        //             console.log('error');
        //         }
        //     })
        // },
        // remove(product){
        //     this.getJSON(`${API}/deleteFromBasket.json`)
        //     .then(data => {
        //         if(data.d){
        //             if(product.quantity > 1){
        //                 product.quantity--;
        //             }else{
        //                 this.items.splice(this.items.indexOf(product), 1)
        //             }
        //         }else{
        //             console.log('error');
        //         }
        //     })
        // }
    // },
    // mounted(){
    //    this.getJSON(`${API + this.cartUrl}`)
    //     .then(data => {
    //        for(let el of data.contents){
    //            this.items.push(el)
    //        }
    //     });
    //    this.getJSON(`${API + this.catalogUrl}`)
    //     .then(data => {
    //        for(let el of data){
    //            this.products.push(el);
    //        }
    //     });
    //     this.getJSON(`getProducts.json`)
    //      .then(data => {
    //          for(let el of data){
    //              this.products.push(el);
    //          }
    //      })
    // }
// })



// class list {// список
//     // debugger
//     constructor(url, container) {
//         this.container = container
//         this.url = url
//         // общее
//         this.items = [] // массив хранения активных обьектов
//         this.DTOarr = []// массив для получения данных
//         this._init()//метод инициализации "_" методы для внутренней обработки внутри обьектов
//     }
//     _init() {
//         return false // метод заглушка которая позволяет переоприделить его в других классах при наследовании
//     }
//     getJSON(url) { //аформление запросов 
//         return fetch(url)
//         .then(data => data.json())
            
//     }
//     render() {
//         const block = document.querySelector(this.container)
//         this.DTOarr.forEach(elem => {
//             let item = new Lists[this.constructor.name](elem)
//             this.items.push(item)
//             block.insertAdjacentHTML('beforeend', item.render())
//         })
//     }
//     fiter() {
//         // потом
//     }

// }
//супер класс для ProductItem и CartItem
// class listItem {// эл-т списка   
//     constructor(elem, img = image) {
//         this.product_name = elem.product_name
//         this.id_product = elem.id_product
//         this.img = img
//         this.price = elem.price
//     }
//     render() {
//         // debugger
//         return `<div class="product-item" data-id="${this.id_product}">
//                  <img src="${this.img}" alt="Some img">
//                     <div class="desc">
//                         <h3>${this.product_name}</h3>
//                         <p>${this.price} $</p>
//                         <button class="buy-btn" 
//                         data-id="${this.id_product}"
//                         data-title="${this.product_name}"
//                         data-image="${this.img}"
//                         data-price="${this.price}">Купить</button>
//                     </div>
//                 </div>` 
//     }
// }

// class Productslist extends list {
//     constructor(cart, url = '/myJSON.json', container = '.products') {
//       super(url, container)
//       this.cart = cart
//     }
//     _init() {
//         this.getJSON(FAKEAPI + this.url) 
//            .then(data => {this.DTOarr = data})     
//            .finally(() => {
//                this.render()
//             })
//         }
//     }
//     // let cartblock = new Cartlist
    
    
// class Cartlist extends list {
//     constructor(url = '/getBasket.json', container = '.cart-block') {
//         super(url, container)
//     }
//     _init() {
//         this.getJSON(FAKEAPI + this.url)
//         .then(data => {this.DTOarr = data.contents})
//         .finally(() => { 
//             this.render()
//         })
//     }
// }

// let cart = new Cartlist()
// let products = new Productslist(cart)


// class ProductItem extends listItem {

// }

// class CartItem extends listItem {
//    constructor(elem, img = cartImage) {
//       super(elem, img)
//       this.quantity = elem.quantity
//    }
//    render() {
//        return `<div class="cart-item" data-id="${this.id_product}">
//                 <div class="product-bio">
//                     <img src="${this.img}" alt="Some image">
//                     <div class="product-desc">
//                         <p class="product-title">${this.product_name}</p>
//                         <p class="product-quantity">Quantity: ${this.quantity}</p>
//                         <p class="product-single-price">$${this.price} each</p>
//                     </div>
//                 </div>
//                 <div class="right-block">
//                     <p class="product-price">$${this.quantity * this.price}</p>
//                     <button class="del-btn" data-id="${this.id_product}">&times;</button>
//                 </div>
//             </div>`
//    }
// } 

// const Lists = {
//     Productslist: ProductItem,
//     Cartlist: CartItem
// }

// document.querySelector('.btn-cart').addEventListener('click', () => {
//     document.querySelector('.cart-block').classList.toggle('invisible');
// });
// //кнопки удаления товара (добавляется один раз)
// document.querySelector('.cart-block').addEventListener ('click', (evt) => {
//     if (evt.target.classList.contains ('del-btn')) {
//         removeProduct (evt.target);
//     }
// })
// //кнопки покупки товара (добавляется один раз)
// document.querySelector('.products').addEventListener ('click', (evt) => {
//     if (evt.target.classList.contains ('buy-btn')) {
//         addProduct (evt.target);
//     }
// })
// let userCart = [];

// class Product {
//     constructor(product) {
//         this.title = product.title
//         this.id = product.id
//         this.img = product.img
//         this.price = product.price
//     }
//     render() {
//          return `<div class="product-item" data-id="${this.id}">
//                  <img src="${this.img}" alt="Some img">
//                     <div class="desc">
//                         <h3>${this.title}</h3>
//                         <p>${this.price} $</p>
//                         <button class="buy-btn" 
//                         data-id="${this.id}"
//                         data-title="${this.title}"
//                         data-image="${this.img}"
//                         data-price="${this.price}">Купить</button>
//                     </div>
//                 </div>`
//     }
// }

// class Products {
//     constructor(block) {
//         this.products = []
//         this.block = `.${block}`
//         this._init()
//     }
//     _init() {
//         arrItems.forEach(item => {
//             this.products.push(new Product(item))
//         })
//         this.render()
//     }
//     render() {
//         let block = document.querySelector(this.block)
//         let str = ''
//         this.products.forEach(item => {
//             str += item.render()
//         })
//         block.innerHTML = str
//     }
// }
// // console.log(list)
// let catalog = new Products('products')
// class CartItem {
//     constructor(dataset) {
//        this.title = dataset.title
//        this.id = dataset.id
//        this.img = dataset.img
//        this.price = dataset.price
//        this.quantity = dataset.quantity
//     }
//     renderCart() {
//         return `<div class="cart-item" data-id="${this.id}">
//                                 <div class="product-bio">
//                                     <img src="${this.img}" alt="Some image">
//                                     <div class="product-desc">
//                                         <p class="product-title">${this.title}</p>
//                                         <p class="product-quantity">Quantity: ${this.quantity}</p>
//                                         <p class="product-single-price">$${this.price} each</p>
//                                     </div>
//                                 </div>
//                                 <div class="right-block">
//                                     <p class="product-price">$${this.quantity * this.price}</p>
//                                     <button class="del-btn" data-id="${this.id}">&times;</button>
//                                 </div>
//                             </div>`
//     }
// }

// class Cart {
//     constructor(block) {
//         this.dataset = []
//         this.productId = +product.dataset['id'];
//         this.block = `.${block}`
//         // this.addProduct()
//     }
//     addProduct (product) {
//         let find = userCart.find (element => element.id === this.productId);
//         if (!find) {
//             userCart.push ({
//                 title: product.dataset['title'],
//                 id: this.productId,
//                 img: cartImage,
//                 price: +product.dataset['price'],
//                 quantity: 1
//             }).forEach(item => {
//                 this.dataset.push(new Cart(item))
//             })

//         }  else {
//             find.quantity++
//         }
//         this.renderCart()
//     }
//     renderCart() {
//      let block = document.querySelector(this.block)
//      let str = ''
//      this.dataset.forEach(item => {
//          str +=item.renderCart()
//      })
//       block.innerHTML = str
//     }
//     removeProduct (product) {
//         let productId = +product.dataset['id'];
//         let find = userCart.find (element => element.id === productId);
//         if (find.quantity > 1) {
//             find.quantity--;
//         } else {
//             userCart.splice(userCart.indexOf(find), 1);
//             document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//         }
//         renderCart ();
//     }
// }



//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)



//кнопка скрытия и показа корзины


// создание массива объектов - имитация загрузки данных с сервера
// function fetchData () {
//     let arr = [];
//     for (let i = 0; i < items.length; i++) {
//         arr.push (createProduct (i));
//     }
//     return arr
// };

//создание товара
// function createProduct (i) {
//     return {
//         id: ids[i],
//         title: items[i],
//         price: prices[i],
//         img: image,
//         quantity: 0,
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
// function addProduct (product) {
//     let productId = +product.dataset['id'];
//     let find = userCart.find (element => element.id === productId);
//     if (!find) {
//         userCart.push ({
//             title: product.dataset ['title'],
//             id: productId,
//             img: cartImage,
//             price: +product.dataset['price'],
//             quantity: 1
//         })
//     }  else {
//         find.quantity++
//     }
//     renderCart ()
// }


// //удаление товаров
// function removeProduct (items) {
//     let productId = +items.dataset['id'];
//     let find = items.find (element => element.id === productId);
//     if (find.quantity > 1) {
//         find.quantity--;
//     } else {
//         items.splice(items.indexOf(find), 1);
//         document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//     }
//     renderCart ();
// }

// //перерендер корзины
// function renderCart () {
//     let allProducts = '';
//     for (el of userCart) {
//         allProducts += `<div class="cart-item" data-id="${el.id}">
//                             <div class="product-bio">
//                                 <img src="${el.img}" alt="Some image">
//                                 <div class="product-desc">
//                                     <p class="product-title">${el.title}</p>
//                                     <p class="product-quantity">Quantity: ${el.quantity}</p>
//                                     <p class="product-single-price">$${el.price} each</p>
//                                 </div>
//                             </div>
//                             <div class="right-block">
//                                 <p class="product-price">$${el.quantity * el.price}</p>
//                                 <button class="del-btn" data-id="${el.id}">&times;</button>
//                             </div>
//                         </div>`
//     }

//     document.querySelector(`.cart-block`).innerHTML = allProducts;
// }
