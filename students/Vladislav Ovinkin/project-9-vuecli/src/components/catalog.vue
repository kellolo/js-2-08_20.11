<template>
    <div class="products">
        <div v-if="!getFilteredLength()">Нет данных</div>
        <catalog-item v-for="product of filtered" :el="product" :key="product.product_id"></catalog-item>
    </div>
</template>

<script>
import catalogItem from './catalogItem'
export default {
    data: function () {
        return {
            items: [],
            filtered: [],
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
        filter (searchValue = "") {
            const regexp = new RegExp (searchValue, 'i');
            this.filtered = this.items.filter (product => regexp.test (product.product_name));
        },
    },
    mounted () {
        this.getProducts ('/api/catalog')
            .finally (() => this.filter ());
    },
    components: {
        'catalog-item': catalogItem
    },
}
</script>
