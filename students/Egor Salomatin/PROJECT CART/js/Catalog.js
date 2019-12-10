Vue.component('catalog', {
    data: function () {
        return {
            productApi: "https://raw.githubusercontent.com/salegorka/json/master/catalogData.json" 
        }
    },
    props: ['products'],
    methods: {
        addProductToCart (evt) {
            let id = +event.target.dataset["id"]
            let find = this.$parent.cart.find(elem => elem.pr.id === id)
            if (!find) {
                // Так поле quantity обновляется реактивно
                let NewCartItem = {
                    pr: this.products[id-1],
                    quantity: 1
                }
                this.$parent.cart.push(NewCartItem)
            } else {
                find.quantity++
            }
        }
    },
    mounted() {
        console.log(this.products);
    },
    template: `<div class="products">
                    <catalog-item v-for="product in products" :el="product" :key="product.id"/>
                </div>`
})