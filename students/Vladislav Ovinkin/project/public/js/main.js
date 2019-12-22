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
        postJSON (url, obj) {
            return fetch (url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify (obj),
            })  
                .then (d => d.json());
        },
        putJSON (url, data) {
            return fetch (url, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify ({some: data}),
            })  
                .then (d => d.json());
        },
        deleteJSON (url) {
            return fetch (url, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
            })  
                .then (d => d.json());
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