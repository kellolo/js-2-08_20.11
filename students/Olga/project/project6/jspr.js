const FAKEAPI = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
//import catalog from './Catalog'

let app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        cartItems: [],
        imgCart: 'https://placehold.it/100x80',
        // err: '',
        // filter: ''
    },
    methods: {
        getJSON (url) {
            return fetch (url)
                .then (d => d.json())
        },
        
    },
    mounted () {
        // this.getJSON (FAKEAPI + this.catalogUrl)
        //     .then (data => this.products = data)
    },
    // components: {
    //     'catalog': catalog
    // }
})


