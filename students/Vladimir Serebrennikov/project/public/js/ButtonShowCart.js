export default Vue.component('buttonshowcart', {
  data() {
    return {
      isViewedCart: true
    }
  },

  methods: {
    viewCart() {
      this.isViewedCart = !this.isViewedCart;
    }
  },
  
  template: `
    <button class="btn-cart" type="button" @click="viewCart">
      Корзина
    </button>
  `
});