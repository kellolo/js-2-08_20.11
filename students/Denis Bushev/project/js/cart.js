Vue.component('cart', {
    data() {
        return {
            cart: [],
            hidenCart: false,
            imgCart: 'https://placehold.it/100x80',
            cartUrl: 'https://raw.githubusercontent.com/Jestric-sys/js-data-item/master/dataBasket.json'
        }
    },
    mounted() {
        this.$parent.getJSON(this.cartUrl)
            .then(data => this.cart = data)
    },
    template: `
        <div class="div-cart">
            <button class="btn-cart" type="button" @click="hidCart">Корзина</button>
            <div v-show="hidenCart" class="cart-block">
				<cart-product v-for="item of cart" :img="imgCart" :el="item" :key="item.id"></cart-product>
	        </div>
        </div>
    `,
    methods: {
        hidCart() {
            this.hidenCart = !this.hidenCart
        },
        addProduct(product) {
            let find = this.cart.find(item => item.id === product.id)
            if(!find) {
                let add = {
                    title: product.title,
                    id: product.id,
                    price: product.price,
                    quantity: 1
                }
                this.cart.push(add)
            } else {
                find.quantity++
            }
        },
        removeProduct(product) {
            let find = this.cart.find(item => item.id === product.id)
            if(find.quantity > 1) {
                find.quantity--
            } else {
                this.cart.splice(this.cart.indexOf(find), 1)
            }
        }
    }
})