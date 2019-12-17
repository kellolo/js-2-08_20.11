import {HTTPRequest} from './connectLib.js'

export default Vue.component('catalog', {
  data() {
    return {
      products: [],
      catalogUrl: '/api/catalog'
    }
  },
  mounted() {
    HTTPRequest(this.catalogUrl)
    .then((data) => {
      this.products = JSON.parse(data)
    })
  },
  template: `
    <div class="products">
      <catalog-item v-for="item of products" :el="item" :key="item.id_product"></catalog-item>
    </div>
  `,
});
