import catalog from './components/Catalog'
import cart from './components/Cart'
import SearchForm from './components/SearchForm'
import error from './components/error'

let app = {
    el: '#app', 
    data: {    
        newProducts: [],
        showProducts: [],
        searchLine: '',
        isVisibleProducts: true,
        errorMessage: '',
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
                this.showErrorMessage ('Ничего не найдено') 
            }
        },
        showErrorMessage (text) {
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
            .catch(e => this.showErrorMessage ('Ошибка получения данных'))
            .finally(() => this.filterProduct ())
    },
    components: {
        'catalog': catalog,
        'cart': cart,
        'search-form': SearchForm,
        'error': error,
    },
}

export default app
