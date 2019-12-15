Vue.component('cart-item', {
    props: ['img', 'item'],
    methods: {
        productPrice (item) {
            return item.quantity * item.price
        },
    },
    template: `
    <div class="cart-item" v-for="item in cart">
    <div class="product-bio">
        <img :src="img" alt="Some image">
        <div class="product-desc">
            <p class="product-title">{{item.product_name}}</p>
            <p class="product-quantity">Quantity: {{item.quantity}}</p>
            <p class="product-single-price">{{item.price}} each</p>
        </div>
    </div>
    <div class="right-block">
        <p class="product-price">{{item.quantity * item.price}} $</p>
        <button class="del-btn" :data-id="item.id_product" @Click="removeItem">&times;</button>
    </div>
    
</div>
    `
})