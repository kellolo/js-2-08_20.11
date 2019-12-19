Vue.component('catalog-item', {
    methods: {
        addClick(el){
            this.$root.$refs['cart'].addProduct(el)
        }
    },
    props: ['img', 'el'],
    template: `
    <div class="product-item">
        <img :src="img" alt="Some img">
        <div class="desc">
            <h3>{{ el.product_name }}</h3>
            <p>{{ el.price }} $</p>
            <button class="buy-btn" @click="addClick(el)">Купить</button>
        </div>
    </div>`
})