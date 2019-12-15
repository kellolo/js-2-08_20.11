//import catalogItem from './CatalogItem'
Vue.component('cart', {
    data() {
        return {
            cartitems: [],
            imgCart: 'https://placehold.it/100x80',
            cartUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
            quantity: 1,
        }
    },

    methods: {
        addProduct(product) {
            // console.log(product.product_name)
            // console.log(this.name)
            let find = this.cartitems.find(element => element.product_name === product.product_name);
            //     if (find) {
            //         this.cartitems.push(product)
            //         console.log("yew")
            //    }  
            //    else {
            //       find.quantity++
            //     }
        },
   

    removeProduct(product) {

        let find = this.cartitems.find(element => element.product_name === product.product_name);
        if (find.quantity > 0) {
            find.quantity--;
            console.log(find.quantity)
        } else {
            console.log(this.cartitems.splice(this.cartitems.indexOf(find), 1));
        }
    },
},



mounted() {
    this.$parent.getJSON(this.cartUrl)
        .then(data => this.cartitems = data)
},
template: `
    <div class="cart-block">
        <cart-item v-for="product of cartitems" 
        :img="imgCart" :el="product" :quant="quantity" :key="product.id_product"/>
    </div>
    `,
})

//export default catalog
