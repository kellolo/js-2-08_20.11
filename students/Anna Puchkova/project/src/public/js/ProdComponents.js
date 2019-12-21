const product = {
    props: ['product', 'img'],
    template: `<div class="card">
                        <img class="card-img-top" :src="img" :alt=product.product_name :title=product.product_name>
                        <div class="desc">
                            <h3> {{ product.product_name }} </h3>
                            <p> {{ product.price }} </p>
                            <button type="button" class="btn btn-warning add-to-cart" @click="$root.$refs.cart.add(product)">Добавить в корзину</button>
                        </div>
                </div>
`
};



const products = {
    data() {
        return {
            filteredProducts: [],
            products: [],
            img: 'https://placehold.it/200x150',
            catalogUrl: '/api/products',//'/catalogData.json',
            //searchLine:'',
        }
    },
    components: {
        'product' : product
    },
    methods: {
        setInitialFilteredProducts() {
            this.filteredProducts = this.products;

        },

        FilterGoods(value) {
            if (value) {
                let regexp = new RegExp(value, 'i');
                this.filteredProducts = this.products.filter(item => {
                    if (regexp.test(item['product_name'])) {
                        console.log(item['product_name']);
                        return item;
                    }
                })

            }

        }
    },
    mounted() {
        this.$parent.getJson(this.catalogUrl)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.setInitialFilteredProducts();
                }
            });
    },
    template: `<div class="container fluid">
                    <div v-if="filteredProducts.length" class="products row align-items-start justify-content-center" id="products">

                        <product 
                        class="product-item" 
                        v-for="product of filteredProducts"
                        :key="product.id_product"
                        :img="img"
                        :product="product">
                        </product>
                    </div>

                    

                    <div v-else class="empty">
                        <h3>Нет данных</h3>
                    </div>
                </div>`
};

export default products;


