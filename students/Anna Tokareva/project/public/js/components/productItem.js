Vue.component ('product-item', {
	props: ['product'],
	template: `<div class="product-item" :data-id="product.id">
                        <img :src="product.image" alt="Some img">
                        <div class="desc">
                            <h3>{{product.title}}</h3>
                            <p>{{product.price}} $</p>
                            <button class="buy-btn"
                            @click="$root.$refs.cart.addProduct(product)">Купить</button>
                        </div>
                    </div>`
});