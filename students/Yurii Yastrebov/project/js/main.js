const app = new Vue({
    el: '#app',
    data: {
        urlProducts: 'https://raw.githubusercontent.com/netproblemmm/js-2-08_20.11/master/students/Yurii%20Yastrebov/project/products.json',
        products: [],
        isVisibleCart: false,
        cartItems: [],
        searchLine: '',
        cartImage: 'https://placehold.it/100x80'
    },
    methods: {
        showCart() {
            this.isVisibleCart = !this.isVisibleCart
        },
        getJSON(url) {
            fetch(url)
                .then(d => d.json ())
                .then(data => this.products = data)
        },
        addToCart(product) {
            let find = this.cartItems.find(item => item.id === product.id)
            if (!find) {
                let addingProduct = {
                    title: product.title,
                    id: product.id,
                    image: product.cartImage,
                    price: product.price,
                    quantity: 1
                }
                this.cartItems.push(addingProduct)
            } else {
                find.quantity++
            }
        },
        removeFromCart(product) {
            let find = this.cartItems.find(item => item.id === product.id)
            if (find.quantity > 1) {
                find.quantity--
            } else {
                this.cartItems.splice(this.cartItems.indexOf(find), 1)
            }
        },
        filterGoods() {
            this.filter = this.products.filter(el => (el.title = this.searchLine))
        }
    },
    mounted () {
        this.getJSON(this.urlProducts)
    }
})
