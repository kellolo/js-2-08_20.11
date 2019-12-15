'use strict';

// import catalogItem from './CatalogItem';

Vue.component ('catalog', {
    data () {
        return {
            items: [],
            catalogUrl: 'https://raw.githubusercontent.com/vladovinkin/js-2-08_20.11/master/students/Vladislav%20Ovinkin/project/json/catalogData.json',
            addUrl: 'https://raw.githubusercontent.com/vladovinkin/js-2-08_20.11/master/students/Vladislav%20Ovinkin/project/json/AddToBasket.json',
        }
    },
    methods: {
        addProduct (product) {
            this.getJSON (this.addUrl)
                .then (answer => {return answer.result})
                .then (result => {
                    if (result == 1) {
                        const find = this.cart.find (element => element.product_id === product.product_id);
                        if (!find) {
                            let newItem = Object.assign ({}, product);
                            delete newItem.img;
                            newItem.quantity = 1;
                            this.cart.push (newItem);
                        } else {
                            find.quantity++;
                        }
                        this.calcTotalSum();
                    } else {
                        throw new Error ('Server error adding item!');
                    }
                }); 
        },
    },
    mounted () {
        this.$parent.getProducts (this.catalogUrl)
            .finally (() => this.$parent.filter ());
    },
    template: `
        <div class="products">
            <span v-if="$parent.getFilteredLength == 0">Нет данных</span>
            <span>{{ items}}</span>
            <catalog-item v-for="product of items" :el="product" :key="product.product_id"></catalog-item>
        </div>
    `,
    // components: {
    //     'catalog-item': catalogItem,
    // },
})

// export default catalog;