let app = new Vue ({
    el: '#app', 
    data: {    
        productImage: 'https://placehold.it/200x150',
        cartImage: 'https://placehold.it/100x80',
        newProducts: [],
        showProducts: [],
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
        postJSON (url, obj) {
            return fetch (url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify (obj)
            })
                .then (d => d.json())
        },
        putJSON (url, obj) {
            return fetch (url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify (obj)
            })
                .then (d => d.json())
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
    },
    computed: {
        // Вью смотрит на методы как на данные
        // полностью реактивны
    },
    mounted () {      
        this.getJSON ('/api/catalog')
            .then(d => this.saveNewProducts(d))
            .catch(e => this.showMessage ('Ошибка получения данных'))
            .finally(() => this.filterProduct ())
    }
})