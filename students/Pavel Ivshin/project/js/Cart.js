Vue.component('cart', {
data () {
    return {
        items: [],
        imgCart: 'https://placehold.it/100x80',
        cartUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
        isCartVisible: false
    }
},
methods: {
    onClick(){
        this.isCartVisible = !this.isCartVisible
    },
    getCarts(){
        this.$parent.getJSON (this.cartUrl)
        .then(data => {this.items = data})
    },
    removeProduct(el){
        this.$parent.getJSON('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json')
        .then(data => {
            if(data.result == 1)
            {
                this.getCarts()
            }
        })
    },
    addProduct(el){
            this.$parent.getJSON('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json')
            .then(data => {
                if(data.result == 1)
                {
                    this.getCarts()
                }
            })
    }
},
mounted () {
    this.getCarts()
},
template: `
    <div class="cart">
        <button class="btn-cart" type="button" @click="onClick">Корзина</button>
        <div v-show="isCartVisible" class="cart-block">
            <cart-item v-for="product of items.contents" :img="imgCart" :el="product" :key="product.id_product"/>
        </div>
    </div>`
})