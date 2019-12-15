export default Vue.component('catalog-item', {
  data() {
    return {
      imgDefault: 'https://placehold.it/200x150',
    }
  },
  props: ['el'],
  template: `
    <div class="product-item">
      <img :src="imgDefault" alt="Some img">
      <div class="desc">
          <h3>{{ el }}</h3>
          <p>{{ el }} $</p>
          <button class="buy-btn" @click="$root.$refs.cartcomp.addProduct(el)">Купить</button>
      </div>
    </div>
  `,
});
