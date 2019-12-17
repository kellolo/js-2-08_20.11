Vue.component ('product-item', {
    props: [
        'product', 'img'
    ],
    data () {
        return {

        }
    },
    mounted () {
        // console.log (this)
    },
    template: `
        <div class="product-item">
            <img :src="img" alt="Some img">
            <div class="desc">
                <h3> {{ product.name }} </h3>
                <p>{{ product.price }} $</p>
                <button class="buy-btn" @click="$parent.addProduct(product)">Купить</button>
            </div>
        </div>
    `
})

Vue.component ('catalog', {
    props: [],
    data () {
        return {
            image: 'https://placehold.it/200x150',
            filtered: [],
            
            //url: '/catalogData.json'
            url: '/goods.json'
        }
    },
    async mounted () {
        let result = null
        try {
            result = await this.$parent.getData (this.url)
            .then (data => data.json ())
        }
        catch (error) {
            result = [];
            this.$parent.err = error;
        }
        finally {
            this.$parent.products = result;
            this.filtered = result;
        }
        this.$root.$on('filterCatalog', function (_filtered) {
            this.$root.$refs.cata.filtered = _filtered;
        });
    },
    methods: {
        addProduct (prod) {
            prod.quantity = typeof(prod.quantity) === 'undefined' ? 1 : ++prod.quantity;
            this.$root.$emit('refreshCart');
        },
    },
    template: `
        <div class="products">
            <product-item v-for="product of filtered" :key="product.id" :product="product" :img="image">
            </product-item>
        </div>
    `
})