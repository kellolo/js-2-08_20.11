import catalog from './Catalog'
import cart from './Cart'

let app = {
    el: '#app',
    data: {
        logo: 'E-shop',
        fakeapi: 'https://raw.githubusercontent.com/KirylJazzSax/js-2-08_20.11/js_lvl_2_expression/students/KirylMatsenka/json',
        localfakeapi: 'http://localhost:82/my',
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
                body: JSON.stringify ({product: obj})
            })
        },
        putJSON (url, data) {
            return fetch (url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify ({product: data})
            })
        },
        deleteJSON (url, obj) {
            return fetch (url, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify ({product: obj})
            })
        }
    },
    components: {
        'catalog': catalog,
        'cart': cart
    }
}
export default app