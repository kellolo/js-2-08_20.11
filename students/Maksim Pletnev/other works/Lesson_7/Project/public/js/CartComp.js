Vue.component('cart', {
    data () {
       return {
           cartItems: [],
           imgCart: 'https://placehold.it/50x100',
           cartUrl: '/getBasket.json',
           showCart: false
       }
    },
    mounted () {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            })
    },
    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product)

            if (find) {
                //put
                this.$parent.putJson (`/api/cart/${find.id_product}`, {quantity: 1})
                    .then (data => {
                        if (data.result) {
                            find.quantity++
                        }
                    })
            } else {
                //post
                let prod = Object.assign({quantity: 1}, product)
                this.$parent.postJson ('/api/cart', prod)
                    .then (data => {
                        if (data.result) {
                            this.cartItems.push (prod)
                        }
                    })
            }
        },
        remove(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product)
            if (find.quantity > 1) {
                //put
                this.$parent.putJson (`/api/cart/${find.id_product}`, {quantity: -1})
                    .then (data => {
                        if (data.result) {
                            find.quantity--
                        }
                    })
            } else {
                //post
                let prod = Object.assign({quantity: 1}, product)
                this.$parent.postJson (`/api/cart/del/${find.id_product}`)
                    .then (data => {
                        if (data.result) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    })
            }
            // this.$parent.getJson(`${API}/deleteFromBasket.json`)
            //     .then(data => {
            //         if(data.result){
            //             if(product.quantity > 1){
            //                 product.quantity--;
            //             } else {
            //                 this.cartItems.splice(this.cartItems.indexOf(product), 1);
            //             }
            //         }
            //     })
        }
    },
   template: `<div>
                <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                <div class="cart-block" v-show="showCart">
                    <p v-if="!cartItems.length">Cart is empty</p>
                    <cart-item 
                    v-for="product of cartItems"  
                    :key="product.id_product"
                    :img="imgCart"
                    :cart-item="product"></cart-item>
                </div>
            </div>`
});
Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item" >
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                            <p class="product-single-price">$ {{cartItem.price}} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                        <button class="del-btn" @click="$parent.remove(cartItem)">&times;</button>
                    </div>
                </div>`
})