const FAKEAPI = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
    //import catalog from './Catalog'

let app = new Vue({
    el: '#app',
    data: {
        cartVisiblity: false,
        catalogUrl: '/catalogData.json',
        products: [],
        filteredProducts: [],
        imgCart: 'https://placehold.it/100x80',
        // err: '',
        // filter: ''
    },
    methods: {
        getJSON(url) {
            return fetch(url)
                .then(d => d.json())
        },

        onCartBtnClick() {
            this.cartVisiblity = !this.cartVisiblity
        },

        filterProducts(regString) {
            this.products = this.$children[1].items;
            this.products.forEach((elem) => {
                if (elem.product_name.search(regString) != -1) {
                    this.filteredProducts.push(elem);
                } else {
                    this.filteredProducts = []
                }
            })
            console.log(this.filteredProducts)
        }
    },
    mounted() {
        console.log(this)

        // this.getJSON (FAKEAPI + this.catalogUrl)
        //     .then (data => this.products = data)
    },
    // components: {
    //     'catalog': catalog
    // }
})