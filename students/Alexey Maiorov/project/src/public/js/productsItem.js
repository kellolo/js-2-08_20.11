let productItem = {
    props: ['img', 'item'],
    template: ` <div class="product-item">
                    <img :src="img" alt="Some img">
                    <div class="desc">
                        <h3>{{item.title}}</h3>
                        <p>{{item.price}}</p>
                        <button class="buy-btn" v-on:click="$root.$refs.cart.addProduct(item)">Купить</button>
                    </div>
                </div>`
}
export default productItem