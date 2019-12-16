Vue.component('catalog', {
    data() {
        return {
            items: [],
            imgCatalog: 'https://placehold.it/200x150',
            cartImage: 'https://placehold.it/100x80',
            urlProducts: 'https://raw.githubusercontent.com/netproblemmm/js-2-08_20.11/master/students/Yurii%20Yastrebov/project/products.json',
        }
    },
    mounted() {
        this.$parent.getJSON('api/catalog')
        .then(data => this.items = data)
    },
    template: `
    <div class="products">
        <catalog-item v-for="product of items" :img="imgCatalog" :el="product" :key="product.id_product"/>
    </div>
    `,
})
