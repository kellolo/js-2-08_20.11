const searchForm = {
    data () {
        return {
            isVisibleCart: true,
            imgCart: 'https://placehold.it/100x80',
        }
    },
    template: `
    <div class="inline">
        <form action="#" class="search-form">
            <input type="text" class="search-field" v-model="$parent.searchLine">
            <button class="btn-search" type="submit" v-on:click="$parent.filterProduct">
                <i class="fas fa-search"></i>
            </button>
        </form>
    </div>
    `,
}

export default searchForm
