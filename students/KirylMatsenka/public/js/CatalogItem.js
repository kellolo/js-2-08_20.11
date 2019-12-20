Vue.component ('catalog-item', {
    props: ['product'],
    template: `<div class="product-item">
                    <img :src="product.image" alt="Some img">
                    <div class="desc">
                        <h3>{{ product.name }}</h3>
                        <p>{{ product.price }} $</p>
                        <button class="buy-btn" @click="$root.$refs.cartcomp.addProduct (product)">Купить</button>
                    </div>
                </div>`
})