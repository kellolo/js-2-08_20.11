let app = new Vue({
    el: '#app',
    data: {
        urlProducts: 'https://raw.githubusercontent.com/netproblemmm/js-2-08_20.11/master/students/Yurii%20Yastrebov/project/products.json',
        cart: [],
        isVisibleCart: false,
        filteredProducts: [],
        products: [],
        cartImage: 'https://placehold.it/100x80',
    },
    methods: {
        showCart() {
            this.isVisibleCart = !this.isVisibleCart
        },
        getJSON(url) {
            return fetch(url)
                .then(d => d.json ())
        },
        filterProducts() {   
            if (this.products != null)
                this.filteredProducts = this.products.filter(el => el.name.toUpperCase() == (this.searchStr == "" ? el.name.toUpperCase() : this.searchStr.toUpperCase()))
        },
    },
    mounted () {
        this.getJSON(this.urlProducts)
    },
})
