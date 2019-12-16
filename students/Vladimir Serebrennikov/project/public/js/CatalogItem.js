import {makeGETRequest} from './connectLib.js'

export default Vue.component('catalog-item', {
  data() {
    return {
      imgDefault: 'https://placehold.it/200x150',
      cartUrl: '/api/cart',
    }
  },
  props: ['el'],
  methods: {

  },
  template: `
    <div class="product-item">
      <img :src="el.img || imgDefault" alt="Some img">
      <div class="desc">
          <h3>{{ el.product_name }}</h3>
          <p>{{ el.price }} $</p>
          <button class="buy-btn" @click="$root.$refs.cartcomp.addProduct(el)">Купить</button>
      </div>
    </div>
  `
});