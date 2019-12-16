Vue.component('search-form', {
    data () {
        return {
            cartVisible: true,
            cartImage: 'https://placehold.it/100x80',
        }
    },
    template: `
    <div class="inline">
        <form action="#" class="search-form">
            <input type="text" class="search-field" v-model="$parent.searchLine">
            <button class="btn-search" type="submit" v-on:click="$parent.filterProducts">
                <i class="fas fa-search"></i>
            </button>
        </form>
    </div>
    `,
})