'use strict';

//import catalog from './Catalog';

const app = new Vue ({
    el: '#app',
    data: {
        cartItemsCount: 0,
        cartshow: false,
        searchLine: '',
    },
    methods: {
        getJSON (url) {
            return fetch (url)
                .then (d => d.json());
        },
        toggleCartShow () {
            this.cartshow = !this.cartshow;
        },
        setCartItemsCount () {
            this.cartItemsCount = this.$root.$refs.cartComp.getCartItemsCount ();
        },
    },
    // components: {
    //     'catalog': catalog,
    // },
})