Vue.component('filtercomp', {
    data () {
        return {
            searchLine: ''
        }
    },
    methods: {
        onFilterClick(){
            console.log('click')
            this.$root.$refs['catalog'].filter(this.searchLine)
        }
    },
    template: `
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model="searchLine">
        <button class="btn-search" @click="onFilterClick()">
            <i class="fas fa-search"></i>
        </button>
    </form>
    `
})