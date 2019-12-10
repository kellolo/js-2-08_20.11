let app = new Vue ({
    el: '#app', 
    data: {    
        productImage: 'https://placehold.it/200x150',
        cartImage: 'https://placehold.it/100x80',
        newProducts: [],
        showProducts: [],
        userCart: [],
        API_URL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
        searchLine: '',
        isVisibleProducts: true,
        errorMessage: '',
    },
    methods: {
        // Вью смотрит на методы как на функции
        getJSON (url) {
            return fetch (url)
                .then (d => d.json ())
        },
        saveNewProducts (data) {
            this.newProducts = data
            return data
        },
        saveUserCart (data) {
            this.userCart = data.contents
            return data
        },
        filterProduct () {
            this.showProducts = this.newProducts.filter(item => item.product_name.toLowerCase().includes(this.searchLine.toLowerCase()))
            if (this.showProducts.length == 0) {
                this.isVisibleProducts = false
            } else {
                this.showMessage ('Ничего не найдено') 
            }
        },
        showMessage (text) {
            this.isVisibleProducts = true
            this.errorMessage = text
        },
        addProduct (product) {
            this.getJSON(this.API_URL + '/addToBasket.json')
                .then(d => {
                    if (d.result) {
                        let find = this.userCart.find (element => element.id_product === product.id_product)
                        if (!find) {  
                            const newProduct = Object.assign({quantity: 1}, product)
                            this.userCart.push (newProduct)  
                        }  else {
                            find.quantity++        
                        }
                    }
                    return d
                })  
        },
        removeProduct (product) {
            this.getJSON(this.API_URL + '/deleteFromBasket.json')
                .then(d => {
                    if (d.result) {
                        let findID =  this.userCart.findIndex(element => element.id_product === product.id_product)
                        if (this.userCart[findID] && this.userCart[findID].quantity > 1) {
                            this.userCart[findID].quantity--
                        } else if (this.userCart[findID]) {
                            this.userCart.splice(findID, 1)          
                        }
                    }
                    return d
                })        
        },
    },
    computed: {
        // Вью смотрит на методы как на данные
        // полностью реактивны
    },
    mounted () {      
        this.getJSON (this.API_URL + '/catalogData.json')
            .then(d => this.saveNewProducts(d))
            .catch(e => this.showMessage ('Ошибка получения данных'))
            .finally(() => this.filterProduct ())
        this.getJSON (this.API_URL + '/getBasket.json')
            .then(d => this.saveUserCart (d))
            .catch(e => this.showMessage ('Ошибка получения данных'))
    }
})