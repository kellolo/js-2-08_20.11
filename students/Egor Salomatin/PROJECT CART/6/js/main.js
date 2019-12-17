let app = new Vue({
    el: "#app",
    data: {
        isCartVisible: false,
        cart: [],
        filteredProducts: [],
        products: [],
        productApi: "https://raw.githubusercontent.com/salegorka/json/master/catalogData.json" 
    },
    methods: {
        getJSON(url) {
            return fetch(url)
                .then(response => response.json())
        },
        filterProducts(regString) {
            if (regString === "") {
                this.filteredProducts = this.products
                return
            }
            this.filteredProducts = []
            let regExp = new RegExp(regString, "i")
            this.products.forEach(function (el) {
                if(regExp.test(el.item)) {
                    this.filteredProducts.push(el);
                }
            }, this)
        },
        showCart() {
            this.isCartVisible = !this.isCartVisible;
        },
    },
    mounted () {
        this.getJSON(this.productApi)
                .then(data => this.products = data)
                .then(data => {this.filteredProducts = this.products
                })
    }
})