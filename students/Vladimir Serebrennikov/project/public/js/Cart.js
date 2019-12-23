import {HTTPRequest} from './connectLib.js'

export default Vue.component('cart', {
  data() {
    return {
      cart: [],
      cartUrl: '/api/cart'
    }
  },

  methods: {

    getCart() {
      HTTPRequest(this.cartUrl, 'GET')
      .then((data) => {
        this.cart = JSON.parse(data)
      })
    },

    addProduct(product) {
      HTTPRequest(this.cartUrl, 'POST', product)
      .then((data) => {
        this.cart = JSON.parse(data)
      })
    },

    removeProduct(product) {
      HTTPRequest(this.cartUrl, 'DELETE', product)
      .then((data) => {
        this.cart = JSON.parse(data)
      })
    }
  },

  mounted() {
    this.getCart()
  },

  template: `
    <div class="cart-block" :class="{ invisible: $root.$refs.buttonshowcartcomp.isViewedCart }">
      <cart-item v-for="item of cart.contents" :el="item" :key="item.id_product"></cart-item>
      <p><b>Total sum:</b> {{ cart.amount }}$</p>
    </div>
  `,
});
