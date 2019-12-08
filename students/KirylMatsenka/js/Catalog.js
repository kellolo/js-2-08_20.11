Vue.component('catalog', {
    data () {
        return {
            products: [],
            catalogUrl: '/catalog',
        }
    },
    
    methods: {
        getProducts () {
            this.$parent.getJSON (this.$parent.localfakeapi + this.catalogUrl)
            .then (json => {this.products = json})
        },
        addProduct (product) {
            this.$root.events.addProduct.$emit('addProduct', product)
        },
    },
    mounted () {
        this.getProducts ()
    },
    template: `<div class="products">
                    <catalog-item v-for="product of products" :product="product" :key="product.id"></catalog-item>
              </div>`
})