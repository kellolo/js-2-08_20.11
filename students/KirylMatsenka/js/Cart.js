Vue.component ('cart', {
    data () {
        return {
            cart: [],
            cartUrl: '/cart',
            show: false
        }
    },
    methods: {
        // Простой вопрос: Здесь для удобства лучше через if писать или можно и так? или пофиг?
        removeProduct (product) {
            let cartItem = this.cart.find (item => item == product)
            cartItem.quantity == 1 
            ? this.cart.splice (this.cart.indexOf (product), 1) 
            : cartItem.quantity--
        },
    },
    mounted () {
        this.$parent.getJSON (this.$parent.localfakeapi + this.cartUrl)
            .then (json => {this.cart = json.contents})
        // По клику на кнопку в компоненте CatalogItem сюда (через $root)
        // прилетает product и тут мы его добавляем корзину 
        // Можно так делать? Или лучше по другому связывать компоненты?
        this.$root.events.addProduct.$on ('addProduct', (product) => {
            let cartItem = this.cart.find ((cartItem) => cartItem.id == product.id)
            if (cartItem) {
                cartItem.quantity++
            } else {
                Vue.set (product, 'quantity', 1)
                this.cart.push (product)
            }
        })
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