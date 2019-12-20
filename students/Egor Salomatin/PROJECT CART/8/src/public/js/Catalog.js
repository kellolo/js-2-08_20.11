import catalogItem from './CatalogItem'
let catalog = {
    data () {
        return {
            items: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    mounted () {
        this.$parent.getJSON ('/api/catalog')
            .then (data => this.items = data)
    },
    template: `
    <div class="products">
        <catalog-item v-for="product of items" :img="imgCatalog" :el="product" :key="product.id_product"/>
    </div>
    `,
    components: {
        'catalog-item': catalogItem
    }
}

export default catalog