const addProductEvent = new Vue ()

let app = new Vue ({
    el: '#app',
    data: {
        logo: 'E-shop',
        fakeapi: 'https://raw.githubusercontent.com/KirylJazzSax/js-2-08_20.11/js_lvl_2_expression/students/KirylMatsenka/json',
        localfakeapi: 'http://localhost:82/my',
        events: {
            addProduct: addProductEvent
        }
    },
    methods: {
        getJSON (url) {
            return fetch (url)
                .then (d => d.json())
        },
    },
})