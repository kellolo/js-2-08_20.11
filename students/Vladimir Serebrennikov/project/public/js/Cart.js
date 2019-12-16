import {makeGETRequest} from './connectLib.js'

export default Vue.component('cart', {
  data() {
    return {
      cart: [],
      cartUrl: '/api/cart',
      toggleCart: false
    }
  },
  methods: {

    getCart(){
      makeGETRequest(this.cartUrl, 'GET')
      .then((data) => {
        this.cart = JSON.parse(data)
      })
    },

    addProduct(product) {
      this.cart.contents.push(product)
      makeGETRequest(this.cartUrl, 'POST', product)
      .then((data) => {
        console.log (product)
        // this.products = JSON.parse(data)
      })
    },

    showCart () {
      this.toggleCart = !this.toggleCart;
    },

    // removeProduct(target) {
    //   console.log(target)
    //   // let find = this.contentCart.find (el => el.id_product == target.dataset.id_product)
    //   if (target.quantity > 1) {
    //     target.quantity--;
    //   } else {
    //       this.contentCart.splice(this.contentCart.indexOf(find), 1)
    //   }
    // }
  },

  watch: {
    cart: function() {
      this.getCart();
    }
  },

  // computed: {
  //   addProduct: function() {
  //     makeGETRequest(this.cartUrl, 'POST', product)
  //     .then((data) => {
  //       console.log (data)
  //       this.cart = JSON.parse(data)
  //     })
  //   }
  // },
  mounted() {
    console.log(this.$root.$refs)
    this.getCart()
  },
  // beforeUpdate() {
  //   console.log('beforeUpdate')
  // },
  // updated() {
  //   console.log('updated')
  // },
  template: `
    <div class="cart-block">
      <cart-item v-for="item of cart.contents" :el="item" :key="item.id_product"></cart-item>
    </div>
  `,
});
