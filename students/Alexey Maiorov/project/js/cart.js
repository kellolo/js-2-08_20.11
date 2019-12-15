Vue.component('cart', {
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
            cartUrl: 'https://raw.githubusercontent.com/alexmaiorov/for_json/master/cartData.json',
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
                this.cart.push ({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1
                })
            } else {
                find.quantity++
            }
        },
        removeProduct (product){
            let find = this.cart.find (element => element.id === product.id)
            if (find.quantity > 1) {
                find.quantity--;
            } else {
                this.cart.splice(this.cart.indexOf(find), 1);
            }
        }
    },
    mounted() {
        this.$parent.getJSON(this.cartUrl)
            .then(data => this.cart = data)
    }
})