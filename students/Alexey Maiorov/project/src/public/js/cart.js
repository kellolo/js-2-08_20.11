import cartItem from './cartItem'
let cart = {
    template: ` <div class="wrapper">
                <button class="btn-cart" type="button" v-on:click = "showCart">Корзина</button>
                    <div class="cart-block" v-if = "!cartInvisible">
                        <cartItem v-for = "prodObj of cart" :img="cartImg" :item="prodObj" :key="prodObj.id"></cartItem>
                    </div>
                </div>`,
    data() {
        return {
            cart: [],
            cartImg: 'https://placehold.it/100x80',
            addApproveUrl: 'https://raw.githubusercontent.com/alexmaiorov/for_json/master/addToBasket.json',
            delApproveUrl: 'https://raw.githubusercontent.com/alexmaiorov/for_json/master/deleteFromBasket.json',
            cartInvisible: true
        }
    },
    methods: {
        showCart (){
            this.cartInvisible = !this.cartInvisible
        },
        addProduct(product) {
            let find = this.cart.find (element => element.id === product.id)
            if (!find) {
                let pr = Object.assign ({}, product, {quantity: 1})
                this.$parent.postJSON ('/api/cart', pr)
                .then (answer => {
                    if (answer.result) {
                        this.cart.push (pr)    
                    }
                })
            } else {
                this.$parent.putJSON (`/api/cart/${find.id}`, 1)
                .then (answer => {
                    if (answer.result) {
                        find.quantity++
                    }
                })
            }
        },
        removeProduct (product){
            if (product.quantity > 1) {
                this.$parent.putJSON (`/api/cart/${product.id}`, -1)
                .then (answer => {
                    if (answer.result) {
                        product.quantity--
                    }
                })
            } else {
                this.$parent.deleteJSON (`/api/cart/${product.id}`)
                .then (answer => {
                    if (answer.result) {
                        console.log(product)
                        this.cart.splice (this.cart.indexOf (product), 1)
                    }
                })
            }
        }
    },
    mounted() {
        this.$parent.getJSON('/api/cart')
            .then(data => this.cart = data.contents)
    },
    component: {
        'cartItem': cartItem
    }
}
export default cart