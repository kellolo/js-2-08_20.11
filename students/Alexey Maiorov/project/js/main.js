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
    }
})