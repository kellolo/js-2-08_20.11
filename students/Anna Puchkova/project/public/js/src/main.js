//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

//const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const API= 'https://raw.githubusercontent.com/annapuchkova/js-2-08_20.11/master/students/Anna%20Puchkova/other%20works/lesson3';

const app = new Vue({
    el: '#app',
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
    },
    mounted() {
        console.log(this);
    }
});

/*let app = new Vue ({
    el: '#app', 
    data: {    
        productImage: image,
        cartImage: cartImage,
        newProducts: [],
        showProducts: [],
        cart: [],
        API_URL: API_URL,
        searchLine: '',
        isVisibleCatalog: true,
        errorMessage: '',
    },
    methods: {
        getJSON (url) {
            return fetch (url)
                .then (d => d.json ())
        },
        saveNewProducts (data) {
            this.newProducts = data;
            return data;
        },
        savecart (data) {
            this.cart = data.contents;
            return data;
        },
        filterProduct () {
            this.showProducts = this.newProducts.filter(item => item.product_name.toLowerCase().includes(this.searchLine.toLowerCase()))
            if (this.showProducts.length == 0) {
                this.isVisibleCatalog = false;
            } else {
                this.showMessage ('No products') ;
            }
        },
        showMessage (text) {
            this.isVisibleCatalog = true;
            this.errorMessage = text;
        },
        addProduct (product) {
            this.getJSON(this.API_URL + '/addToBasket.json')
                .then(data => {
                    if (data.result) {
                        let find = this.cart.find (element => element.id_product === product.id_product);
                        if (!find) {  
                            const newProduct = Object.assign({quantity: 1}, product);
                            this.cart.push (newProduct); 
                        }  else {
                            find.quantity++;  
                        }
                    }
                    return data;
                })  
        },
        removeProduct (product) {
            this.getJSON(this.API_URL + '/deleteFromBasket.json')
                .then(data => {
                    if (data.result) {  
                        let findID =  this.cart.findIndex(element => element.id_product === product.id_product)
                        if (this.cart[findID] && this.cart[findID].quantity > 1) {
                            this.cart[findID].quantity--;
                        } else if (this.cart[findID]) {
                            this.cart.splice(findID, 1);     
                        }
                    }
                    return data;
                })        
        },
    },
    computed: {

    },
    mounted () {      
        this.getJSON (FAKEAPI)
            .then(d => this.saveNewProducts(d))
            .catch(e => this.showMessage ('Error server'))
            .finally(() => this.filterProduct ())
        this.getJSON (this.API_URL + '/getBasket.json')
            .then(d => this.saveUserCart (d))
            .catch(e => this.showMessage ('No find'))
    }
});*/


