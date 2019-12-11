Vue.component('products', {
    template: ` <div class="products">
                    <productItem v-for="prodObj in finds" :img="image" :item="prodObj" :key="prodObj.id"></productItem>
                </div>`,
    data() {
        return {
            catalogURL:'https://raw.githubusercontent.com/alexmaiorov/for_json/master/catalogData.json',
            image: 'https://placehold.it/200x150',
            products: [],
            finds: []
        }
    },
    methods:{
        search(str) {
            let reg = new RegExp (str, 'i')
            this.finds = this.products.filter (el => reg.test(el.title))
        }
    },
    mounted () {
        this.$parent.getJSON(this.catalogURL)
            .then(data => this.products = data)
            .then(data => this.finds = data)
    }
})