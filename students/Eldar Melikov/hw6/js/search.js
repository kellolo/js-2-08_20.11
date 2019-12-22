Vue.component ('search-block', {
    data () {
        return {
            filter: ''
        }
    },
    methods: {
        filterCatalog () {
            const reg = new RegExp (this.filter, 'i')
            let filtered = this.$root.products.filter(el => reg.test (el.name));
            this.$root.$emit('filterCatalog', filtered);
        }
    },
    template: `
    <form action="#" class="search-form" @submit.prevent="filterCatalog">
        <input type="text" class="search-field" v-model.lazy="filter">
        <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form>
    `
})