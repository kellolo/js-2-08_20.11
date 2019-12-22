const search = {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `<div>
    <form action="#" @submit.prevent='$parent.$refs.products.FilterGoods(searchLine)'>

        <button type="submit" aria-label="Поиск по списку товаров"><i class="fas fa-search" aria-label="Поиск по списку товаров"></i></button>
        
        <input v-model="searchLine" type="text" placeholder="Search" aria-label="Search">

    </form></div>`
};

export default search;

