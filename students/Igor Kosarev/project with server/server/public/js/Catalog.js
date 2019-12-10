//import catalogItem from './CatalogItem'
Vue.component('catalog', {
  data() {
    return {
      items: [],
      imgCatalog: 'https://placehold.it/200x150',
      //catalogUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
      catalogUrl: '/api/catalogData'
    }
  },
  methods: {
    addProduct(product) {
      this.$parent.$children[0].addProduct(product)
    }
  },
  mounted() {
    this.$parent.getJSON(this.catalogUrl)
      .catch(err => this.$parent.$children[2].viewError("Ошибка загрузки товаров каталога: " + err))
      .then(data => this.items = data)

  },
  template: `
    <div class="products">
        <catalog-item v-for="product of items" :img="imgCatalog" :el="product" :key="product.id_product"/>
    </div>
    `,
  // components: {
  //     'catalog-item': catalogItem
  // }
})

//export default catalog