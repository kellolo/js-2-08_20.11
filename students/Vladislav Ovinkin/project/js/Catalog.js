'use strict';

// import catalogItem from './CatalogItem';

Vue.component ('catalog', {
    data () {
        return {
            items: [],
            filtered: [],
            catalogUrl: 'https://raw.githubusercontent.com/vladovinkin/js-2-08_20.11/master/students/Vladislav%20Ovinkin/project/json/catalogData.json',
        }
    },
    methods: {
        getFilteredLength: function () {
            return (this.filtered != null) ? this.filtered.length : 0
        },
        getProducts (url) {
            return this.$parent.getJSON (url)
                .then (data => this.items = data);
        },
        filter () {
            const regexp = new RegExp (this.searchLine, 'i');
            this.filtered = this.items.filter (product => regexp.test (product.product_name));
        },
    },
    mounted () {
        this.getProducts (this.catalogUrl)
            .finally (() => this.filter ());
    },
    template: `
        <div class="products">
            <span v-if="!getFilteredLength()">Нет данных</span>
            <catalog-item v-for="product of items" :el="product" :key="product.product_id"></catalog-item>
        </div>
    `,
    // components: {
    //     'catalog-item': catalogItem,
    // },
})

// export default catalog;