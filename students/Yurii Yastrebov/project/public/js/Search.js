Vue.component('search', {
    data() {
        return {
            searchLine: ""
        }
    },
    methods: {
        filterGoods(ev) {
            this.$parent.filterProducts(this.searchLine)
        }
    },
    template: `
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model="searchLine">
        <button class="btn-search" type="submit" @click="filterGoods($event)">
            <i class="fas fa-search"></i>
        </button>
    </form>
    `
})


