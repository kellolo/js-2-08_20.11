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
        showCart (){
            this.cartInvisible = !this.cartInvisible
        },
        addProduct(event) {
            let productId = +event.target.dataset['id']
            let find = this.cart.find (element => element.id === productId)
            if (!find) {
                this.cart.push ({
                    id: this.products[productId-1].id,
                    title: this.products[productId-1].title,
                    price: this.products[productId-1].price,
                    quantity: 1
                })
            } else {
                find.quantity++
            }
        },
        removeProduct (event){
            let productId = +event.target.dataset['id']
            let find = this.cart.find (element => element.id === productId)
            if (find.quantity > 1) {
                find.quantity--;
            } else {
                this.cart.splice(this.cart.indexOf(find), 1);
            }
        }
    },
    mounted () {
        this.getJSON(this.dataURL)
            .then(d => this.products = d)
    }
})