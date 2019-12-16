import {makeGETRequest} from './connectLib.js'

export default Vue.component('cart', {
  data() {
    return {
      cart: [],
      cartUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
      addApproveUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
      delApproveUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
    }
  },
  methods: {
    addProduct (product) {
      console.log (product)
    }
  },
  mounted() {
    makeGETRequest(this.cartUrl)
    .then((data) => {
      this.cart = JSON.parse(data)
      console.log(this.cart)
    })
    .catch((err) => {
        console.log(err)
    });
  },
  template: `
    <div class="cart-block">
      <cart-item v-for="item of cart.contents" :el="item" :key="item.id_product"></cart-item>
    </div>
  `,
});
