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
        postJSON (url) {

        },
        putJSON (url) {

        },
        deleteJSON (url) {

        },
        toggleCartShow () {
            this.cartshow = !this.cartshow;
        },
        setCartItemsCount () {
            this.cartItemsCount = this.$root.$refs.cartComp.getCartItemsCount ();
        },
        filterCatalog () {
            this.$root.$refs.catalogComp.filter (this.searchLine);
        }
    },
    // components: {
    //     'catalog': catalog,
    // },
})