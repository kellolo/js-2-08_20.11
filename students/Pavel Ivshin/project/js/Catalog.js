Vue.component('catalog', {
    data () {
        return {
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            catalogUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
        }
    },
    methods: {
    },
    mounted () {
        this.$parent.getJSON (this.catalogUrl)
            .then(data => {this.products = data})
    },
    template: `
    <div class="products">
        <catalog-item v-for="product of products" :img="imgCatalog" :el="product" :key="product.id_product" />
    </div>`
})