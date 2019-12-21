//import catalogItem from './CatalogItem'
Vue.component('catalog', {
    data() {
        return {
            items: [],
            imgCatalog: 'https://placehold.it/200x150',
            catalogUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
        }
    },

    methods: {
        addProduct(product) {
            console.log(product.product_name)
        }
    },
    mounted() {
        this.$parent.getJSON(this.catalogUrl)
            .then(data => this.items = data)
    },
    template: `
    <div class="products">
        <catalog-item v-for="product of items" :img="imgCatalog" :el="product" :key="product.id_product"/>
    </div>
    `,
    // components: {
    //     'catalog-item': catalogItem
    // }
})

//export default catalog