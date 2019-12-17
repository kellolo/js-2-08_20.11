Vue.component('products', {
    data(){
        return {
            catalogUrl:`/catalogData.json`,
            DTOarr:[],
            image:`https://placehold.it/200x150`,
            //filtered:[],
        }
    },
    methods:{
        // filter(){
        //     let regexp = new RegExp(this.userSearch, 'i');
        //     this.filtered = this.products.filter(el => regexp.test(el.product_name));
        // }
    },
    mounted(){
        this.$parent.getJSON(`${API + this.catalogUrl}`)
        .then(data => {
           for(let el of data){
               this.DTOarr.push(el);
            //    this.filtered.push(el);
            }
        });
        this.$parent.getJSON(`getProducts.json`)
        .then(data => {
            for(let el of data){
                this.DTOarr.push(el);
                // this.filtered.push(el);
             }
         });
    },
    temlate:
    `<div class="products">
      <product  
      v-for="product of DTOarr" 
      :key="product.id_product"
      :product="product"
      :img="image"></product>
    </div>`
    
});
Vue.component('product', {
    props:['product', 'img'],
    temlate:
    `<div class="product-item">
            <img :src="img" :alt="product.product_name">
            <div class="desc">
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}} $</p>
                <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
            </div>
    </div>`
})