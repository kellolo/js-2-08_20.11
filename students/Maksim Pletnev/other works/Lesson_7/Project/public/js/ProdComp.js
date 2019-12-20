Vue.component('products', {
    data () {
        return {
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            catalogUrl: '/catalogData.json',
            filtered: []
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products">
                    <product 
                    v-for="product of products" 
                    :key="product.id_product"
                    :img="imgCatalog"
                    :product="product"></product>
                </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item" >
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{ product.product_name }}</h3>
                    <p>{{ product.price }} $</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct (product)">Купить</button>
                </div>
            </div>`
})