Vue.component('cart', {
    data() {
        return {
            cart: [],
            hidenCart: false,
            imgCart: 'https://placehold.it/100x80',
            //cartUrl: 'https://raw.githubusercontent.com/Jestric-sys/js-data-item/master/dataBasket.json',
            // addCart: 'https://raw.githubusercontent.com/Jestric-sys/js-data-item/master/addBasket.json',
            // delCart: 'https://raw.githubusercontent.com/Jestric-sys/js-data-item/master/deleteBasket.json'
        }
    },
    mounted() {
        this.$parent.getJSON('/api/cart')
            .then(data => this.cart = data.contents)
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
            if(find) {

                // this.$parent.putJSON(this.addCart)
                // .then(answer => {
                //     if(answer.result) {
                //         find.quantity++
                //     }
                // })
                console.log('Попробуй, или во вторник')
                this.$parent.putJSON('/api/cart/}', {quantity: 1})
                    .then(data => {
                        find.quantity++
                    })
            } else {
                let pr = Object.assign({}, product, {quantity: 1})
                this.$parent.postJSON('/api/cart', pr)
                .then(answer => {
                    if(answer.result) {
                        this.cart.push(pr)
                    }
                })
            }
        },
        removeProduct(product) {
            let find = this.cart.find(item => item.id === product.id)
            if(product.quantity > 1) {
                this.$parent.getJSON(this.delCart)
                .then(answer => {
                    if(answer.result) {
                        find.quantity--
                    }
                })
            } else {
                this.$parent.getJSON(this.delCart)
                .then(answer => {
                    if(answer.result) {
                        this.cart.splice(this.cart.indexOf (product), 1)
                    }
                })
            }
        }
    }
})