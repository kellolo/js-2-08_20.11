Vue.component ('cart-item', {
    props: ['product'],
    template: `<div class="cart-item">
                    <div class="product-bio">
                        <img :src="product.img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{ product.product }}</p>
                            <p class="product-quantity">Quantity: {{ product.quantity }}</p>
                            <p class="product-single-price">\${{ product.price }} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">\${{ product.quantity * product.price }}</p>
                        <button class="del-btn" @click="$parent.removeProduct (product)">&times;</button>
                    </div>
                </div>`
}) 