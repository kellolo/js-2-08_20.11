// const image = 'http://placehold.it/200x200'
// const cart_image = 'http://placehold.it/75x75'
// const FAKEAPI = 'https://raw.githubusercontent.com/VladimirKul/online-store-api/master/responses'

// class List {
//     constructor(url, container) {
//         this.url = url
//         this.container = container

//         this.products = []
//         this.productsDTO = []

//         this._init()
//     }

//     getJSON(url) {
//         return fetch(url).then(data => data.json())
//     }

//     _init() {
//         this.getJSON(FAKEAPI + this.url).then(d => {
//             this.productsDTO = d
//         })
//     }

//     render() {
//         const block = doc.querySelector(this.container)
//         this.productsDTO.forEach(el => {
//             let product = new lists[this.constructor.name](el)
//             this.products.push(product)
//             block.insertAdjacentHTML('beforeEnd', product.render())
//         })
//     }
// }

// class ProductsList extends List {
//     constructor(url = '/catalogData.json', container = '.wrap-product') {
//         super(url, container)
//     }

//     _init() {
//         this.getJSON(FAKEAPI + this.url).then(d => {
//             this.productsDTO = d
//             this.render()
//         })
//     }
// }

// class CartList extends List {
//     constructor(url = '/getBasket.json', container = '.wrap-cart') {
//         super(url, container)
//         this.sumCart = null
//     }

//     render() {
//         const block = doc.querySelector(this.container)
//         this.products = []
//         this.productsDTO.forEach(el => {
//             let product = new lists[this.constructor.name](el)
//             this.products.push(product)
//             block.insertAdjacentHTML('beforeEnd', product.render())
//         })
//         block.insertAdjacentHTML('beforeEnd', `<h2 class="amount">Total amount: ${cartCatalog.sumCart}&#36; <input type="button" value="X" class="close-cart"></h2>`)
//     }

// addProductCart(evt) {
//     let target = evt.target
//     let btn_buy_target = target.classList.contains('btn-product-item')
//     if (btn_buy_target) {
//         let find_el = cartCatalog.productsDTO.find(function(el) {
//             if (el.id == target.dataset.id) {
//                 return el
//             }
//         })

//         if (find_el) {
//             find_el.count++
//         } else {
//             let objItem = {
//                 id: target.dataset.id,
//                 name: target.dataset.name,
//                 price: target.dataset.price,
//                 count: 1
//             }
//             cartCatalog.productsDTO.push(new ListItem(objItem))
//         }
//         cartCatalog.sumCart += +target.dataset.price
//         doc.querySelector(cartCatalog.container).innerHTML = ''
//         cartCatalog.render()
//     }
// }

// subProductCart(evt) {
//     let target = evt.target
//     let btn_buy_target = target.classList.contains('btn-delete-product')
//     if (btn_buy_target) {
//         let find_el = cartCatalog.productsDTO.find((el) => {
//             if (el.id == target.dataset.id) {
//                 return el
//             }
//         })

//         if (find_el.count > 1) {
//             find_el.count--
//         } else {
//             cartCatalog.productsDTO.splice(cartCatalog.productsDTO.indexOf(find_el), 1)
//         }
//         cartCatalog.sumCart -= +target.dataset.price
//         doc.querySelector(cartCatalog.container).innerHTML = ''
//         cartCatalog.render()

//     }
// }

// visibilityCart() {
//     let vis_cart = doc.querySelector('.wrap-cart')
//     vis_cart.style.visibility = 'visible';
// }

// closeCart(evt) {
//     if (evt.target.classList.contains('close-cart')) {
//         let vis_cart = doc.querySelector('.wrap-cart')
//         vis_cart.style.visibility = 'hidden';
//     }
// }
// }

// class ListItem {
//     constructor(el) {
//         this.name = el.name
//         this.price = el.price
//         this.id = el.id
//         this.count = el.count
//     }

//     render() {
//         return `
//             <div class="product-item">
//             <img src="http://placehold.it/200x200" alt="img" class="img-product-item">
//             <p class="name-product-item">${this.name}</p>
//             <p class="price-product-item">${this.price} &#36;</p>
//             <input type="button" value="BUY" class="btn-product-item"
//                 data-id="${this.id}" data-name="${this.name}" data-price="${this.price}">
//             </div>
//         `
//     }
// }

// class ProductItem extends ListItem {}

// class CartItem extends ListItem {
//     render() {
//         return `
//                 <div class="cartt">
//                     <div class="wrap-item-cart">
//                         <div class="wrap-desc">
//                             <img src="http://placehold.it/75x75" alt="img">
//                             <p class="cart-name-product">${this.name}</p>
//                             <p class="cart-price-prduct">${this.price} &#36;</p>
//                         </div>
//                         <div class="wrap-calc">
//                             <p class="cart-count-prduct">count: ${this.count}</p>
//                             <p class="cart-sum-product">amount: ${this.price*this.count}</p>
//                             <input type="button" value="+" class="btn-product-item"
//                             data-id="${this.id}" data-name="${this.name}" data-price="${this.price}">
//                             <input type="button" value="-" class="btn-delete-product"
//                             data-id="${this.id}" data-name="${this.name}" data-price="${this.price}">
//                         </div> 
//                     </div>

//                 </div>
//             `
//     }
// }

// const lists = {
//     ProductsList: ProductItem,
//     CartList: CartItem
// }


// let productsCatalog = new ProductsList
// let cartCatalog = new CartList




//     filterProduct(evt) {
//         let arr_rad = doc.querySelectorAll('.radio-sort')
//         let inp_filter = doc.querySelectorAll('.inp-filter')
//         let arr_filter = catalog.product.concat()
//         let inp_filter_sec = +inp_filter[0].value
//         let inp_filter_fir = +inp_filter[1].value

//         if (evt.target.classList.contains('btn-filter') || evt.target.classList.contains('radio-sort')) {
//             if (inp_filter_fir == 0) {
//                 inp_filter_fir = 100000000
//             }

//             let filtered = arr_filter.filter((item => {
//                 return item.price >= inp_filter_sec && item.price <= inp_filter_fir
//             }))

//             if (arr_rad[0].checked) {
//                 filtered.sort((prev, next) => prev.price - next.price)
//             }

//             if (arr_rad[1].checked) {
//                 filtered.sort((prev, next) => next.price - prev.price)
//             }

//             new renderCatalog(filtered)
//         }
//     }

// doc.querySelector('.wrap-product').addEventListener('click', cartCatalog.addProductCart)
// doc.querySelector('.wrap-cart').addEventListener('click', cartCatalog.addProductCart)
// doc.querySelector('.wrap-cart').addEventListener('click', cartCatalog.subProductCart)
// doc.querySelector('.btn-cart').addEventListener('click', cartCatalog.visibilityCart)
// doc.querySelector('.wrap-cart').addEventListener('click', cartCatalog.closeCart)
// doc.querySelector('.wrap-f').addEventListener('click', catalog.filterProduct)

let app = new Vue({
    el: '#app',

    data: {
        fakeapi: 'https://raw.githubusercontent.com/VladimirKul/online-store-api/master/responses',
        arrItems: [],
        arrCart: [],
        visibilityCart: false
    },

    methods: {
        listProduct() {
            let req = this.getJSON(this.fakeapi + '/catalogData.json')
            req.then(data => { this.arrItems = data })
        },

        listCart() {
            let req = this.getJSON(this.fakeapi + '/getBasket.json')
            req.then(data => rhis.arrCart = data)
        },

        getJSON(url) {
            return fetch(url)
                .then(d => d.json())
        },

        addProduct(idItem, nameItem, priceItem) {
            let find_el = this.arrCart.find(function(el) {
                if (el.id == idItem) {
                    return el
                }
            })

            if (find_el) {
                find_el.count++
            } else {
                let item = {
                    id: idItem,
                    name: nameItem,
                    price: priceItem,
                    count: 1
                }
                this.arrCart.push(item)
            }
        },

        subProductCart(idItem) {
            let find_el = this.arrCart.find(function(el) {
                if (el.id == idItem) {
                    return el
                }
            })

            if (find_el.count > 1) {
                find_el.count--
            } else {
                this.arrCart.splice(this.arrCart.indexOf(find_el), 1)
            }

        }
    },

    mounted() {
        this.listProduct()
    }
})