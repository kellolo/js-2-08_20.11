Vue.component('cart-item', {
    props: ['el'],
    template: `
    <div class="cart-item" v-bind:data-id="el.pr.id">
        <div class="product-bio">
            <img v-bind:src="el.pr.imgCart" alt="Some image">
            <div class="product-desc">
                <p class="product-title">{{ el.pr.item }}</p>
                <p class="product-quantity">Quantity: {{el.quantity}}</p>
                <p class="product-single-price">$$ {{ el.pr.price }} each</p>
            </div>
        </div>
        <div class="right-block">
            <p class="product-price">{{ el.quantity * el.pr.price }}</p>
            <button class="del-btn" v-on:click="$parent.removeProductFrCart($event)" v-bind:data-id="el.pr.id">&times;</button>
        </div>
     </div>`
})  