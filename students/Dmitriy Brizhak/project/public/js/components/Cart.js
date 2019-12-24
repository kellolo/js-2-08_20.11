import cartItem from './Cart-item'
const cart = {
    data () {
        return {
            isVisibleCart: true,
            imgCart: 'https://placehold.it/100x80',
            userCart: [],
        }
    },
    methods:{
        addProduct (product) {
            const newProduct = Object.assign({quantity: 1}, product)
            this.$parent.postJSON('/api/cart', newProduct)
                .then(d => {
                    if (d.result) {
                        let find = this.userCart.find (element => element.id_product === product.id_product)
                        if (!find) {  
                            this.userCart.push (newProduct)  
                        }  else {
                            find.quantity++        
                        }
                    }
                    return d
                })  
        },
        removeProduct (product) {
            this.$parent.putJSON('/api/cart', product)
                .then(d => {
                    if (d.result) {
                        let findID =  this.userCart.findIndex(element => element.id_product === product.id_product)
                        console.log(findID)
                        if (this.userCart[findID] && this.userCart[findID].quantity > 1) {
                            this.userCart[findID].quantity--
                        } else if (this.userCart[findID]) {
                            this.userCart.splice(findID, 1)          
                        }
                    }
                    return d
                })        
        },
        saveUserCart (data) {
            this.userCart = data.contents
            return data
        },
    },
    mounted () {
        this.$parent.getJSON ('/api/cart')
            .then(d => this.saveUserCart (d))
            .catch(e => this.showMessage ('Ошибка получения данных'))
    },
    template: `
    <div class="inline">
        <button class="btn-cart" type="button" v-on:click="isVisibleCart = !isVisibleCart">Корзина</button>
        <div class="cart-block " :class="{ invisible: isVisibleCart }">
            <cart-item v-for="product of userCart" :img="imgCart" :el="product" :key="product.id_product"/>
        </div>
    </div>
    `,
    components: {
        'cart-item': cartItem
    }
}

export default cart
