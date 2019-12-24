import cartItem from './cartItem'

let cart = {
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
        this.$parent.getJSON('/cart')
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
            let find = this.cart.find(item => item.id_product === product.id_product)
            if(find) {
                this.$parent.putJSON(`/cart/${find.id_product}`, 1)
                .then(answer => {
                    if(answer.result) {
                        find.quantity++
                    }
                })
            } else {
                let pr = Object.assign({}, product, {quantity: 1})
                this.$parent.postJSON('/cart', pr)
                .then(answer => {
                    if(answer.result) {
                        this.cart.push(pr)
                    }
                })
            }
        },
        removeProduct(product) {
            if(product.quantity > 1) {
                this.$parent.putJSON(`/cart/${find.id_product}`, -1)
                .then(answer => {
                    if(answer.result) {
                        find.quantity--
                    }
                })
            } else {
                this.$parent.deleteJSON(`/cart/${product.id_product}`)
                .then(answer => {
                    if(answer.result) {
                        this.cart.splice(this.cart.indexOf (product), 1)
                    }
                })
            }
        }
    }
}