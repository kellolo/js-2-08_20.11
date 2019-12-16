export default Vue.component('cart-item', {
  data() {
    return {
      imgDefault: 'https://placehold.it/100x80',
    }
  },
  props: ['el'],
  methods: {
    removeProduct(target) {
      console.log(target)
      // let find = this.contentCart.find (el => el.id_product == target.dataset.id_product)
      if (target.quantity > 1) {
        target.quantity--;
      } else {
          this.contentCart.splice(this.contentCart.indexOf(find), 1)
      }
    }
  },
  template: `
    <div class="cart-item">
      <div class="product-bio">
          <img :src="el.img || imgDefault" alt="Some image">
          <div class="product-desc">
              <p class="product-name">{{ el.product_name }}</p>
              <p class="product-quantity">Quantity: {{ el.quantity }}</p>
              <p class="product-single-price">{{ el.price }} each</p>
          </div>
      </div>
      <div class="right-block">
          <p class="product-price">{{ el.quantity * el.price }}</p>
          <button class="del-btn" @click="removeProduct(el)">&times;</button>
      </div>
    </div>
  `,
});