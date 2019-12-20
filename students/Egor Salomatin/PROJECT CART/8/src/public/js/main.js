const FAKEAPI = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

import catalog from './Catalog'
import cart from './Cart'

let app = {
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        cartItems: [],
        imgCart: 'https://placehold.it/100x80',
        isCartVisible: true,
    },
    methods: {
        showCart() {
            this.isCartVisible = !this.isCartVisible
        },
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
                .then (res => res.status)
        },
        putJSON (url, obj) {
            return fetch(url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify (obj)
            })
                .then(res => res.status)
        },
        deleteJSON (url, obj) {
            return fetch (url, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify (obj)
            })
                .then(res => res.status)
        }
        
    },
    components: {
        'catalog': catalog,
        'cart': cart
    }
}

export default app


