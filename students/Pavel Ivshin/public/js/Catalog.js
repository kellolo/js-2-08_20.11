Vue.component('catalog', {
    data () {
        return {
            items: [],
            filterItems:[],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    methods: {
        filter (searchLine) {
            if(this.items == [])
                return

            this.filterItems = this.items.filter(el => !(el.product_name.toUpperCase().indexOf(searchLine.toUpperCase())))
        }
    },
    mounted () {
        this.$parent.getJSON ('/api/catalog')
            .then (data => {this.items = data; this.filterItems = data})
            
    },
    template: `
    <div class="products">
        <catalog-item v-for="item of filterItems" :img="imgCatalog" :el="item" :key="item.id_product"/>
    </div>
    `,
})