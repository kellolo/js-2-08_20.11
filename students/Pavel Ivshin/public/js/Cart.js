Vue.component('cart', {
    data () {
        return {
            items: [],
            imgCart: 'https://placehold.it/100x80',
            addApproveUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
            delApproveUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
            isCartVisible: false
        }
    },
    methods: {
        addProduct (product) {
            let find = this.items.find (item => item.id_product === product.id_product)
            if (find) {
                // this.$parent.putJSON (this.addApproveUrl)
                // .then (answer => {
                //     if (answer.result) {
                //         find.quantity++
                //     }
                // })
                console.log ('Либо сами, либо ждем вторника')
            } else {
                let pr = Object.assign ({}, product, {quantity: 1})
                this.$parent.postJSON ('/api/cart', pr)
                .then (answer => {
                    if (answer.result) {
                        this.items.push (pr)
                    }
                })
            }
        },
        delProduct (product) {
            if (product.quantity > 1) {
                this.$parent.getJSON (this.delApproveUrl)
                .then (answer => {
                    if (answer.result) {
                        find.quantity--
                    }
                })
            } else {
                this.$parent.getJSON (this.delApproveUrl)
                .then (answer => {
                    if (answer.result) {
                        this.items.splice (this.items.indexOf (product), 1)
                    }
                })
            }
        },
        onClick(){
            this.isCartVisible = !this.isCartVisible
        }
    },
    mounted () {
        this.$parent.getJSON ('/api/cart')
            .then (data => this.items = data.contents)
    },
    template: `
    <div class="cart">
        <button class="btn-cart" type="button" @click="onClick">Корзина</button>
        <div v-show="isCartVisible" class="cart-block">
            <cart-item v-for="product of items" :img="imgCart" :el="product" :key="product.id_product"/>
        </div>
    </div>
    `,
})