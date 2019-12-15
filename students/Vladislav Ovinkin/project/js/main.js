'use strict';

//import catalog from './Catalog';

const app = new Vue ({
    el: '#app',
    data: {
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
    },
    // components: {
    //     'catalog': catalog,
    // },
})