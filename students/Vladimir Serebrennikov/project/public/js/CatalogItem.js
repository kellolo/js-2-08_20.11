export default Vue.component('catalog-item', {
  props: ['img', 'el'],
  template: `
    <div class="product-item">
      <img :src="img" alt="Some img">
      <div class="desc">
          <h3>{{ el }}</h3>
          <p>{{ el }} $</p>
          <button class="buy-btn" @click="$root.$refs.cartcomp.addProduct(el)">Купить</button>
      </div>
    </div>
  `,
});
