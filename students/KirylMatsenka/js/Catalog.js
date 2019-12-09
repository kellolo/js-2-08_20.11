Vue.component('catalog', {
    data () {
        return {
            products: [],
            catalogUrl: '/catalog',
        }
    },
    
    methods: {
        // Тут прокидываю событие через $root в корзину и там уже метод который добавляет товар!
        addProduct (product) {
            this.$root.events.addProduct.$emit('addProduct', product)
        },
    },
    mounted () {
        this.$parent.getJSON (this.$parent.localfakeapi + this.catalogUrl)
            .then (json => {this.products = json});
    },
    template: `<div class="products">
                    <catalog-item v-for="product of products" :product="product" :key="product.id"></catalog-item>
              </div>`
})