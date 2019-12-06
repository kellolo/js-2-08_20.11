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
        isVisibleCart: true,
        isVisibleProducts: true,
    },
    methods: {
        // Вью смотрит на методы как на функции
        getJSONPromise (url) {
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
        normalizeProduct (htmlElement) {
            const product = {}
            product.product_name= htmlElement.dataset ['title']
            product.id_product= +htmlElement.dataset['id']
            product.price= +htmlElement.dataset['price']
            product.quantity= 1
            return product
        },
        filterProduct () {
            this.showProducts = this.newProducts.filter(item => item.product_name.toLowerCase().includes(this.searchLine.toLowerCase()))
            if (this.showProducts.length == 0) {
                this.isVisibleProducts = false
            } else {
                this.isVisibleProducts = true
            }
        },
        addProduct (htmlElement) {
            const product = this.normalizeProduct (htmlElement)
            this.getJSONPromise(this.API_URL + '/addToBasket.json')
                .then(d => {
                    if (d.result == 1) {
                        let find = this.userCart.find (element => element.id_product === product.id_product)
                        if (!find) {    
                            this.userCart.push (product)  
                        }  else {
                            find.quantity++          
                        }
                    }
                    return d
                })  
        },
        removeProduct (htmlElement) {
            this.getJSONPromise(this.API_URL + '/deleteFromBasket.json')
                .then(d => {
                    if (d.result == 1) {
                        let findID =  this.userCart.findIndex(element => element.id_product === +htmlElement.dataset['id'])
                        if (this.userCart[findID] && this.userCart[findID].quantity > 1) {
                            this.userCart[findID].quantity--
                        } else if (this.userCart[findID]) {
                            this.userCart.splice(findID, 1)          
                        }
                    }
                    return d
                })        
        },
        productPrice (item) {
            return item.quantity * item.price
        },
    },
    computed: {
        // Вью смотрит на методы как на данные
        // полностью реактивны
    },
    mounted () {      
        this.getJSONPromise (this.API_URL + '/catalogData.json').then(d => this.saveNewProducts(d)).finally(() => this.filterProduct ())
        this.getJSONPromise (this.API_URL + '/getBasket.json').then(d => this.saveUserCart (d))
    }
})