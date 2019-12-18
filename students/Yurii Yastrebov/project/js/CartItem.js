Vue.component('cartItem', {
    props: ['el'],
    template: `
    <div class="cart-item" :data-id="el.id">
        <div class="product-bio">
            <img :src="el.cartImage" alt="Some image">
            <div class="product-desc">
                <p class="product-title">{{el.title}}</p>
                <p class="product-quantity">Quantity: {{el.quantity}}</p>
                <p class="product-single-price">$$ {{el.price}} each</p>
            </div>
        </div>
        <div class="right-block">
            <p class="product-price">{{el.quantity * el.price}}</p>
            <button class="del-btn" @click="removeFromCart(el)" :data-id="item.id">&times;</button>
        </div>
    </div>
    `
})

