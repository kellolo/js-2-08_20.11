import cartItem from './CartItem'
let cart = {
    data () {
        return {
            items: [],
            imgCart: 'https://placehold.it/100x80',
            cartUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
            addApproveUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
            delApproveUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
        }
    },
    methods: {
        addProduct (product) {
            let find = this.items.find (item => item.id_product === product.id_product)
            if (find) {
                this.$parent.putJSON (`/cart/${find.id_product}`, 1)
                .then (answer => {
                    if (answer.result) {
                        find.quantity++
                    }
                })
            } else {
                let pr = Object.assign ({}, product, {quantity: 1})
                this.$parent.postJSON ('/cart', pr)
                .then (answer => {
                    if (answer.result) {
                        this.items.push (pr)
                    }
                })
            }
        },
        delProduct (product) {
            if (product.quantity > 1) {
                this.$parent.putJSON (`/cart/${product.id_product}`, -1)
                .then (answer => {
                    if (answer.result) {
                        product.quantity--
                    }
                })
            } else {
                this.$parent.deleteJSON (`/cart/${product.id_product}`)
                .then (answer => {
                    if (answer.result) {
                        this.items.splice (this.items.indexOf (product), 1)
                    }
                })
            }
        }
    },
    mounted () {
        this.$parent.getJSON ('/cart')
            .then (data => this.items = data.contents)
    },
    template: `
    <div class="cart-block">
        <cart-item v-for="product of items" :img="imgCart" :el="product" :key="product.id_product"/>
    </div>
    `,
    components: {
        'cart-item': catalogItem
    }
}

export default cart