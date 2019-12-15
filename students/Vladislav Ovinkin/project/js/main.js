'use strict';

//import catalog from './Catalog';

// const API_URL = 'https://raw.githubusercontent.com/vladovinkin/js-2-08_20.11/master/students/Vladislav%20Ovinkin/project/json';
// /catalogData.json //получить список товаров;
// /getBasket.json //получить содержимое корзины;
// /addToBasket.json //добавить товар в корзину;
// /deleteFromBasket.json //удалить товар из корзины

const app = new Vue ({
    el: '#app',
    data: {
        API_URL: 'https://raw.githubusercontent.com/vladovinkin/js-2-08_20.11/master/students/Vladislav%20Ovinkin/project/json',
        cartImage: 'https://placehold.it/100x80',
        filtered: null,
        products: null,
        cart: null,
        cartshow: false,
        searchLine: '',
        totalSum: 0,
    },
    methods: {
        getJSON (url) {
            return fetch (url)
                .then (d => d.json());
        },
        getProducts (url) {
            return this.getJSON (url)
                .then (data => this.products = data);
        },
        getCart (url) {
            return this.getJSON (url)
                .then (data => this.cart = data.contents);
            },
        toggleCartShow () {
            this.cartshow = !this.cartshow;
        },
        filter () {
            const regexp = new RegExp (this.searchLine, 'i');
            this.filtered = this.products.filter (product => regexp.test (product.product_name));
        },
        removeProduct () {
            const id = +event.target.dataset.product_id;
            this.getJSON (this.API_URL + '/deleteFromBasket.json')
                .then (answer => {return answer.result})
                .then (result => {
                    if (result == 1) {
                        // const id = +event.target.dataset.product_id;
                        const find = this.cart.find (element => element.product_id === id);
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.cart.splice (this.cart.indexOf (find), 1);
                        }
                        this.calcTotalSum();
                    } else {
                        throw new Error ('Server error removing item!')
                    }
            });
        },
        calcTotalSum () {
            let totalSum = 0;
            this.cart.forEach(element => {
                totalSum += element.price * element.quantity;
            });
            this.totalSum = totalSum;
        },
    },
    computed: {
        getFilteredLength: function () {
            return (this.filtered != null) ? this.filtered.length : 0
        },
        getCartItemsCount: function () {
            return (this.cart != null) ? this.cart.length : 0
        },
    },
    mounted () {
        this.getProducts (this.API_URL + '/catalogData.json')
            .finally (() => this.filter ());
        this.getCart (this.API_URL + '/getBasket.json')
            .finally (() => this.calcTotalSum ());
    },
    // components: {
    //     'catalog': catalog,
    // },
})