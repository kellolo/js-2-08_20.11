'use strict';

import cartItem from './CartItem';

let cart = {
    data () {
        return {
            items: [],
            totalSum: 0,
            cartImage: 'https://placehold.it/100x80',
        }
    },
    methods: {
        addProduct (product) {
            this.$root.$refs.error.clearErrorData ();
            const find = this.items.find (element => element.product_id === product.product_id);
    
            if (!find) {
                let newItem = Object.assign ({}, product, {quantity: 1});
                delete newItem.img;
                this.$parent.postJSON ('/cart', newItem)
                    .then (answer => { 
                        if (answer.result) {
                            this.items.push (newItem);
                            this.calcSummary ();
                        }
                    })
            } else {
                this.$parent.putJSON (`./cart/${find.product_id}`, 1)
                    .then (answer => { 
                        if (answer.result) {
                            find.quantity++;
                            this.calcSummary ();
                        }
                    })
            }
        },
        removeProduct (product) {
            
            this.$root.$refs.error.clearErrorData ();
    
            if (product.quantity > 1) {
                this.$parent.putJSON (`./cart/${product.product_id}`, -1)
                    .then (answer => { 
                        if (answer.result) {
                            product.quantity--;
                            this.calcSummary ();
                        }
                    })
            } else {
                this.$parent.deleteJSON (`./cart/${product.product_id}`)
                    .then (answer => { 
                        if (answer.result) {
                            this.items.splice (this.items.indexOf (product), 1)
                            this.calcSummary ();
                        }
                })
            }
        },
        getCart (url) {
            return this.$parent.getJSON (url)
                .then (data => {
                    this.items = data.contents;
                    this.totalSum = data.amount;
                    this.$parent.cartItemsCount = data.countGoods;
                });
        },
        calcTotalSum () {
            let totalSum = 0;
            this.items.forEach(element => {
                totalSum += element.price * element.quantity;
            });
            this.totalSum = totalSum;
        },
        getCartItemsCount: function () {
            return (this.items != null) ? this.items.length : 0
        },
        calcSummary () {
            this.calcTotalSum();
            this.$root.setCartItemsCount ();
        },
    },
    mounted () {
        this.getCart ('/cart');
    },
    template: `
        <div class="cart-block" v-if="$parent.cartshow">
            <cart-item v-for="product of items" :img="cartImage" :el="product" :key="product.product_id"></cart-item>
            <div v-show="getCartItemsCount() > 0" class='cart-total'>Итого: {{'$' + totalSum }}</div>
            <div v-show="getCartItemsCount() == 0">Корзине скучно без товаров :(</div>
        </div>
    `,
    components: {
        'cart-item': cartItem,
        'cart': cart,
    },
}

export default cart;