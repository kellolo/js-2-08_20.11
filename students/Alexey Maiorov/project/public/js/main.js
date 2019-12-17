const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const FAKEAPI = 'https://raw.githubusercontent.com/alexmaiorov/for_json/master/catalogData.json'

let app = new Vue ({
    el: '#app',
    data: {
        dataURL: FAKEAPI,
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
        putJSON (url, obj) {
            return fetch (url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify (obj)
            })
            .then (d => d.json ())
        },
        deleteJSON (url, obj) {
            return fetch (url, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify (obj)
            })
            .then (d => d.json ())
        }
    }
})