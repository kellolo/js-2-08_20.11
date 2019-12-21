const cartItem = {
    props: ['img', 'el'],
    methods: {
        productPrice (item) {
            return item.quantity * item.price
        },
    },
    template: `
    <div class="cart-item">
        <div class="product-bio">
            <img :src="img" alt="Some image">
            <div class="product-desc">
                <p class="product-title">{{el.product_name}}</p>
                <p class="product-quantity">Quantity: {{el.quantity}}</p>
                <p class="product-single-price">₽{{el.price}} each</p>
            </div>
        </div>
        <div class="right-block">
            <p class="product-price">{{productPrice(el)}}</p>
            <button class="del-btn" @click="$parent.removeProduct(el)">&times;</button>
        </div>
    </div>
    `
}
export default cartItem
