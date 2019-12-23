import catalogItem from './Catalog-item'
const catalog = {
    props: ['items'],
    data () {
        return {
            imgCatalog: 'https://placehold.it/200x150',
        }
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
