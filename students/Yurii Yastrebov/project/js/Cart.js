Vue.component('cart', {
    props: ['cartItems', 'isVisibleCart'],
    methods: {
        addToCart(product) {
            let find = this.cartItems.find(item => item.id === product.id)
            if (!find) {
                let addingProduct = {
                    title: product.title,
                    id: product.id,
                    image: product.cartImage,
                    price: product.price,
                    quantity: 1
                }
                this.cartItems.push(addingProduct)
            } else {
                find.quantity++
            }
        },
        removeFromCart(product) {
            let find = this.cartItems.find(item => item.id === product.id)
            if (find.quantity > 1) {
                find.quantity--
            } else {
                this.cartItems.splice(this.cartItems.indexOf(find), 1)
            }
        },
    },
    template: `
    <div class="cart-block" v-show="isVisibleCart">
        <cart-item v-for="product in cartItems" :el="product" :key="product.id"/>
    </div>
    `
})