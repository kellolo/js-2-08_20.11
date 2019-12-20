const productEvent = new Vue ()

let app = new Vue ({
    el: '#app',
    data: {
        logo: 'E-shop',
        fakeapi: 'https://raw.githubusercontent.com/KirylJazzSax/js-2-08_20.11/js_lvl_2_expression/students/KirylMatsenka/json',
        localfakeapi: 'http://localhost:82/my',
        events: {
            product: productEvent
        }
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
        },
        putJSON (url, obj) {
            return fetch (url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify (obj)
            })
        },
        deleteJSON (url, obj) {
            return fetch (url, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify (obj)
            })
        }
    },
})