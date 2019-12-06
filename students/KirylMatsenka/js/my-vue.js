let app = new Vue ({
    el: '#app',
    data: {
        logo: 'E-shop',
        fakeapi: 'https://raw.githubusercontent.com/KirylJazzSax/js-2-08_20.11/js_lvl_2_expression/students/KirylMatsenka/json',
        localfakeapi: 'http://localhost:82/my',
        productUrl: '/catalog',
        cartUrl: '/cart',
        catalog: null,
        cart: null,
        image: 'https://placehold.it/200x150',
        cartImage: 'https://placehold.it/100x80',
    },
    methods: {
        getJSON (url) {
            return fetch (url)
                .then (d => d.json())
        },
        getCatalog() {
            this.getJSON (this.localfakeapi + this.productUrl)
            .then (json => {this.catalog = json})
        },
        getCart () {
            this.getJSON (this.localfakeapi + this.cartUrl)
            .then (json => {this.cart = json.contents})
        },
        showCart () {
            document.querySelector('.cart-block').classList.toggle('invisible')
        },
        getProductFromCatalog (id) {
            return this.catalog.find ((idProduct) => +idProduct.id == +id)
        },
        getProductFromCart (id) {
            return this.cart.find ((cartItem) => +id == +cartItem.id)
        },
        addProduct (id) {
            let productInCart = this.getProductFromCart (id)
            if (productInCart) {
                productInCart.quantity++
            } else {
                let product = this.getProductFromCatalog (id) 
                Vue.set(product, 'quantity', 1) 
                this.cart.push (product)
            }
        },
        removeProduct (id) {
            let product = this.getProductFromCart (id)
            if (product.quantity == 1) {
                this.cart.splice (this.cart.indexOf (product), 1)
            } else {
                product.quantity--
            }
        },
    },
    mounted () {
        this.getCatalog ()
        this.getCart ()
    },
})