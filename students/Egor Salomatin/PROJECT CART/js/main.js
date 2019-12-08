const productApi = "https://raw.githubusercontent.com/salegorka/json/master/catalogData.json";

let app = new Vue({
    el: "#app",
    data: {
        products: [],
        isCartVisible: false,
        cart: [],
        searchLine: ""
    },
    methods: {
        showCart() {
            this.isCartVisible = !this.isCartVisible;
        },
        getJSON(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.products = data
                })
        },
        addProductToCart(event) {
            let id = +event.target.dataset["id"]
            let find = this.cart.find(elem => elem.pr.id === id)
            if (!find) {
                // Так поле quantity обновляется реактивно
                let NewCartItem = {
                    pr: this.products[id-1],
                    quantity: 1
                }
                this.cart.push(NewCartItem)
            } else {
                find.quantity++
            }
        },
        removeProductFrCart(event) {
            let productId = +event.target.dataset["id"];
            let find = this.cart.find(elem => elem.pr.id === productId);
            if(find.quantity > 1) {
                find.quantity--;
            } else {
                this.cart.splice(this.cart.indexOf(find), 1);
            }
        },
        searchEvt() {
            console.log(this.searchLine);
            this.filterProducts();
        },
        filterProducts() {

        }
    },
    mounted() {
        this.getJSON(productApi)
    },
});