import {makeGETRequest} from './connectLib.js'

export default Vue.component('catalog', {
  data() {
    return {
      products: [],
      catalogUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
    }
  },
  mounted() {
    makeGETRequest(this.catalogUrl)
    .then((data) => {
      this.products = JSON.parse(data)
    })
    .catch((err) => {
        console.log(err)
    });
  },
  template: `
    <div class="products">
      <catalog-item v-for="item of products" :el="item" :key="item.id_product"></catalog-item>
    </div>
  `,
});
