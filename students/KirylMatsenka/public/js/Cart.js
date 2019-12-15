Vue.component ('cart', {
    data () {
        return {
            cart: [],
            cartUrl: '/api/cart',
            show: false
        }
    },
    methods: {
        addProduct (product) {
            let find = this.cart.find (element => element.id === product.id)
            if (find) {
                find.quantity++
                this.$parent.putJSON (this.cartUrl, find).then (answer => {
                    !answer.ok ? find.quantity-- : null
                })
            } else {
                Vue.set (product, 'quantity', 1)
                this.$parent.postJSON (this.cartUrl, product)
                .then (answer => {
                    answer.ok ? this.cart.push (product) : null
                })
                .catch (err => {
                    console.log (err)
                })
            }
        },
        removeProduct (product) {
            let cartItem = this.cart.find (item => item == product)
            if (cartItem.quantity == 1) {
                this.$parent.deleteJSON (this.cartUrl, cartItem)
                .then (answer => {
                    answer.ok ? this.cart.splice (this.cart.indexOf (cartItem), 1) : null
                })
            } else {
                cartItem.quantity--
                this.$parent.putJSON (this.cartUrl, cartItem)
                .then (answer => {
                !answer.ok ? cartItem.quantity++ : null
            })
            }
        },
    },
    mounted () {
        this.$parent.getJSON (this.cartUrl)
            .then (json => {this.cart = json.contents})
    },
    template: `<div class="cart">
                    <form action="#" class="search-form">
                        <input type="text" class="search-field">
                        <button class="btn-search" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
                    <button class="btn-cart" type="button" @click="show = !show">Корзина</button>
                    <div class="cart-block" v-show="show">
                        <cart-item v-for="product of cart" :product="product" :key="product.id"></cart-item> 
                    </div>
                </div>
            `
})