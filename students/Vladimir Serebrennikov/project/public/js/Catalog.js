export default Vue.component('catalog', {
  data() {
    return {
      products: [],
      catalogUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
    }
  },
  methods: {
    addProduct (product) {
      console.log (product.product_name)
    }
  },
  mounted(){

  },
  template: `
    <div>catalog
      <catalog-item v-for="items of products" :el="items" :key="items.id_product"></catalog-item>
    </div>
  `,
});
