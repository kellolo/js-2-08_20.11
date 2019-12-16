Vue.component('filtered', {
    data () {
        return {
            items: [],
            filteredItems: [],
            testFound: '',
            imgCatalog: 'https://placehold.it/200x150'
        }
    },
    methods: {
        itemsFilt () {
            console.log(this.testFound)
            // let regExpUser = new RegExp (value, 'i')
            // this.filteredItems = this.items.filter (item => reg.test(item.product_name))
        },
    },

    template: `
    <div class="flter">
        <filter-item v-for="filteredItems of items" :img="imgCatalog" :el="product" :key="product.id_product"/>
    </div>
    `
})

