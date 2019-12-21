let app = new Vue({
    el: '#app',
    data: {
        urlProducts: 'https://raw.githubusercontent.com/netproblemmm/js-2-08_20.11/master/students/Yurii%20Yastrebov/project/products.json',
        products: [],
        cartItems: [],
        imgCart: 'https://placehold.it/100x80',
        isVisibleCart: false,
        filteredProducts: []
    },
    methods: {
        showCart() {
            this.isVisibleCart = !this.isVisibleCart
        },
        getJSON(url) {
            return fetch(url)
                .then(d => d.json ())
        },
        postJSON(url, obj) {
            return fetch(url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(obj)
            })
                .then(d => d.json ())
        },
        putJSON(url, obj) {
            return fetch(url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(obj)
            })
                .then(d => d.json ())
        },
        deleteJSON(url) {

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
