export default Vue.component('catalog-item', {
  data() {
    return {
      imgDefault: 'https://placehold.it/200x150',
    }
  },
  props: ['el'],
  methods: {
    addProduct(target) {
      console.log(target)
      // let findItemInCart = this.contentCart.find( el => el.id_product == target.dataset.id_product)
      // let newItem = catalog.products.find( el => el.id_product == target.dataset.id_product)

      // if (!findItemInCart) {
      //     this.contentCart.push( new CartItem(newItem) )
      // } else {
      //     findItemInCart.quantity++
      // }
    },
  },
  template: `
    <div class="product-item">
      <img :src="el.img || imgDefault" alt="Some img">
      <div class="desc">
          <h3>{{ el.product_name }}</h3>
          <p>{{ el.price }} $</p>
          <button class="buy-btn" @click="addProduct(el)">Купить</button>
      </div>
    </div>
  `,
});