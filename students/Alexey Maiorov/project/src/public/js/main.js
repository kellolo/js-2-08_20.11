const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
import products from './products'
import cart from './cart'

let app = {
    el: '#app',
    data: {
        products: [],
        cart: [],
        img: image,
        cartImg: cartImage,
        cartInvisible: true
    },
    methods: {
        getJSON (url) {
            return fetch (url)
                .then (d => d.json ())
        },
        postJSON (url, obj) {
            return fetch (url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify (obj)
            })
            .then (d => d.json ())
        },
        putJSON (url, data) {
            return fetch (url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify ({op: data})
            })
            .then (d => d.json ())
        },
        deleteJSON (url) {
            return fetch (url, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"}
            })
            .then (d => d.json ())
        }
    },
    components: {
        'products': products,
        'cart': cart
    }
}

export default app