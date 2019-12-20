import cartItem from './CartItem'
let cart = {
    data () {
        return {
            items: [],
            imgCart: 'https://placehold.it/100x80',
        }
    },
    methods: {
        addProduct (product) {
            let find = this.items.find (item => item.id_product === product.id_product)
            if (find) {
                let pr = Object.assign ({}, {
                    product: find,
                    mod: "+"
                })
                this.$parent.putJSON ('/api/cart', pr)
                .then ( status => {
                    if (status === 200) {
                        find.quantity++
                    }
                })
            } else {
                let pr = Object.assign ({}, product, {quantity: 1})
                this.$parent.postJSON ('/api/cart', pr)
                .then ( status => {
                    if (status === 200) {
                        this.items.push(pr)
                    }
                })
            }
        },
        delProduct (product) {
            if (product.quantity > 1) {
                let pr = Object.assign ({}, {
                    product: product,
                    mod: "-"
                })
                this.$parent.putJSON ('/api/cart', pr)
                .then (status => {
                    console.log(this.items)
                    if (status === 200) {
                        product.quantity--
                    }
                })
            } else {
                this.$parent.deleteJSON ('/api/cart', product)
                .then (status => {
                    if (status === 200) {
                        this.items.splice (this.items.indexOf (product), 1)
                    }
                })
            }
        }
    },
    mounted () {
        this.$parent.getJSON ('/api/cart')
            .then (data => this.items = data.contents)
    },
    template: `
    <div class="cart-block">
        <cart-item v-for="product of items" :img="imgCart" :el="product" :key="product.id_product"/>
    </div>
    `,
    components: {
        'cart-item': cartItem
    }
}

export default cart