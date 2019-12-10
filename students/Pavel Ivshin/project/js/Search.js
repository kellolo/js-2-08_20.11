Vue.component('search', {
    data () {
        return {
            searchLine: "",
        }
    },
    methods: {
        onClick(){
            //TODO
        }
    },
    template: `
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model="searchLine">
        <button class="btn-search" type="submit" v-on:click="onClick">
            <i class="fas fa-search"></i>
        </button>
    </form>
    `
})