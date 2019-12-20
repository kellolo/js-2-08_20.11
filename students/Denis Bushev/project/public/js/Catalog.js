Vue.component('catalog', {
    data () {
        return {
            items: [],
            imgCatalog: 'https://placehold.it/200x150',
            //catalogUrl: 'https://raw.githubusercontent.com/Jestric-sys/js-data-item/master/dataCatalog.json'
        }
    },
    mounted () {
        this.$parent.getJSON ('/api/catalog')
            .then (data => this.items = data)
    },
    template: `
    <div class="products">
        <catalog-item v-for="product of items" :img="imgCatalog" :el="product" :key="product.id"/>
    </div>
    `
    // mounted() {
    //     console.log(this)
    // }
})