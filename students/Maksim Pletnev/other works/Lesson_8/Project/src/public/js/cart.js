let cartProduct = {
    props: ['prod'],
    template: `         
        <div class="cart-item">
            <div class="product-bio">
                <img :src="prod.img" alt="Some image">
                <div class="product-desc">
                    <p class="product-title">{{prod.product_name}}</p>
                    <p class="product-quantity">Quantity: {{prod.quantity}}</p>
                    <p class="product-single-price">{{prod.price}}</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">{{prod.quantity * prod.price}}</p>
                <button class="del-btn" v-on:click="removeItem">&times;</button>
            </div>
        </div>
  
    `,
    methods: {
        removeItem() {
            this.$emit('remove', this.prod.id_product)
        }
    }
}

let cart = {
    data() {
        return {
            products: []
        }
    },

    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                this.products = data.contents
            })
    },

    methods: {
        addProduct(prod) {
            const find = this.products.find((item) => item.id_product === prod.id_product)
            if (find) {
                this.$parent.putJson('/api/cart/' + find.id_product, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            find.quantity++
                        }
                    })
            } else {
                let item = Object.assign({}, prod, { quantity: 1, img: prod.img.replace(/img/, 'img\/small') })
                this.$parent.postJson('/api/cart', item)
                    .then(data => {
                        if (data.result) {
                            this.products.push(item)
                        }
                    })
            }
        },
        removeProduct(id) {
            const find = this.products.find((item) => item.id_product === id)
            const index = this.products.findIndex((item) => item.id_product === id)
            this.$parent.putJson('/api/cart/' + id, { quantity: -1 })

                .then(() => {find.quantity --})
                .then (()=> {
                    if (find.quantity < 1) {
                        this.products.splice(index, 1)
                    }
                })
        },
    },

    template: `<div class="cart-block" v-if="$parent.isVisibleCart">
    <cart-product v-for="product in products" :prod="product" :key="product.id_product" @remove="removeProduct">
    </cart-product>
    </div>
  `,
    components: {
        'cart-product': cartProduct
    }
}

export default cart