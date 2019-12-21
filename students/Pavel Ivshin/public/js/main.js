let app = new Vue ({
    el: '#app',
    data: {
        products: [],
        cartItems: [],
        imgCart: 'https://placehold.it/100x80',
    },
    methods: {
        getJSON (url) {
            return fetch (url)
                .then (d => d.json())
        },
        postJSON (url, obj) {
            return fetch (url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify (obj)
            })
                .then (d => d.json())
        },
        putJSON (url) {
            return fetch (url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            })
            .then (result => result.json())
        },
        deleteJSON (url) {
            //home work
        }
        
    },
    mounted () {
        console.log(this)
        // this.getJSON (FAKEAPI + this.catalogUrl)
        //     .then (data => this.products = data)
    },
})