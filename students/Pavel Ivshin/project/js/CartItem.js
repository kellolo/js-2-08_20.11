Vue.component('cart-item', {
    methods: {
        deleteClick(el){            
            this.$parent.removeProduct(el)
        }
    },
    props: ['img', 'el'],
    template: `
    <div class="cart-item">
        <div class="product-bio">
            <img :src="img" alt="Some image">
            <div class="product-desc">
                <p class="product-title">{{el.product_name}}</p>
                <p class="product-quantity">Quantity: {{el.quantity}}</p>
                <p class="product-single-price">{{el.price}}</p>
            </div>
        </div>
        <div class="right-block">
            <p class="product-price">{{el.quantity * el.price}}</p>
            <button class="del-btn" @click="deleteClick(el)">&times;</button>
        </div>
    </div>
    `
})