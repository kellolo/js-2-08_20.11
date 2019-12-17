Vue.component('search', {
    data() {
        return {
            searchStr: ""
        }
    },
    template: `<form action="#" class="search-form">
                    <input type="text" class="search-field" v-model="searchStr">
                    <button class="btn-search" type="submit" v-on:click="$root.$refs.products.search(searchStr)">
                        <i class="fas fa-search"></i>
                    </button>
                </form>`
})