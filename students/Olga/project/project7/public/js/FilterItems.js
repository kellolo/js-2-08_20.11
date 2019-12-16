Vue.component('filter-item', {
    props: ['img', 'el'],
    template: `
    <div class="product-item">
        <img :src="img" alt="Some img">
        <div class="desc">
            <h3>{{ el.product_name }}</h3>
            <p>{{ el.price }} $</p>
            <button class="buy-btn" @click="$root.$refs.filt.addProduct(el)">Купить</button>
        </div>
    </div>
    `
})
//export default filterItem