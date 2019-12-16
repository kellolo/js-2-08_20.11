Vue.component('cart', {
    props: ['cart', 'visible'],
    methods: {
        removeProductFrCart(event) {
            let productId = +event.target.dataset["id"]
            let find = this.$parent.cart.find(elem => elem.pr.id === productId)
            if(find.quantity > 1) {
                find.quantity--
            } else {
                this.$parent.cart.splice(this.$parent.cart.indexOf(find), 1)
            }
        },
    },
    template:   `<div class="cart-block" v-show="visible">
                        <cart-item v-for="product in cart" :el="product" :key="product.id"/>
                </div>`
})