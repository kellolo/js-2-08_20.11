import catalogItem from './CatalogItem'
let catalog = {
    data () {
        return {
            products: [],
            catalogUrl: '/catalog',
        }
    },
    mounted () {
        this.$parent.getJSON (this.catalogUrl)
            .then (json => this.products = json);
    },
    template: `<div class="products">
                    <catalog-item v-for="product of products" :product="product" :key="product.id"></catalog-item>
              </div>`,
    components: {
        'catalog-item': catalogItem
    }
}
export default catalog