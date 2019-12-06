let app = new Vue ({
    el: '#app',
    data: {
        products: [],
        productsFilter: [],
        cart: [],
        FAKEAPI: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
        image: 'https://placehold.it/200x150',
        cartImage: 'https://placehold.it/100x80',
        cartVisible: false,
        searchLine: ""
    },
    methods: {
        getJSON (url) {
            return fetch (url)
            .then (d => d.json())
        },
        FilterGoods(){
            if(this.products == [])
            return

            if(this.searchLine == "")
            {
                this.productsFilter = [...this.products]
                return
            }

            this.productsFilter = this.products.filter(el => !(el.product_name.toUpperCase().indexOf(this.searchLine.toUpperCase())))
        },
        getCatalog(url){
            this.getJSON(url)
            .then(data => {this.products = data 
                this.productsFilter = data})
        },
        getCart(url){
            this.getJSON(url)
            .then (data => {this.cart = data})
        },
        //фейковое добавление в корзину. корзину всегда с сервера запрашиваю
        addCartItem(){
            this.getJSON(this.FAKEAPI + '/addToBasket.json')
            .then(data => {
                if(data.result == 1)
                {
                    this.getCart(this.FAKEAPI + '/getBasket.json')
                }
            })
            .catch(error => console.log("Error ", error))
        },
        //фейковое удаление из корзины
        removeCartItem(){
            this.getJSON(this.FAKEAPI + '/deleteFromBasket.json')
            .then(data => {
                if(data.result == 1)
                {
                    this.getCart(this.FAKEAPI + '/getBasket.json')
                }
            })
            .catch(error => console.log("Error ", error))
        },
        //отображение/скрытие корзины
        onCartButtonClick(){
            this.cartVisible = !this.cartVisible
        },
        //обработчик ввода в поле input search
        onSearchInput(){
        }
    },
    computed: {
    },
    mounted () {
        this.getCatalog(this.FAKEAPI + '/catalogData.json')
        this.getCart(this.FAKEAPI + '/getBasket.json')
    }
})