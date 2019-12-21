let product = {
  props: ['prod'],
  template: `        
      <div class="product-item">
          <img :src="prod.img" alt="Some img">
          <div class="desc">
              <h3> {{prod.product_name}} </h3>
              <p>{{prod.price}} $</p>
              <button class="buy-btn" @click="buyItem">Купить</button>
          </div>
      </div>
  `,
  methods: {
    buyItem() {
      this.$emit('buy', this.prod)
    }
  }
}

let catalog = {
  data() {
    return {
      products: [],
      filtered: []
    }
  },

  mounted() {
    this.$parent.getJson('/api/products')
      .then(data => {
        this.products = data
        this.filtered = data
      })
  },

  methods: {
    filter(value) {
      let reg = new RegExp(value, 'i')
      this.filtered = this.products.filter(el => reg.test(el.product_name))
    }
  },

  template: `        
  <div class="products">
    <product v-for="product in filtered" :prod="product" :key="product.id_product" @buy="$root.$refs.basket.addProduct">
    </product>
  </div>
`,
  components: {
    product
  }
}

export default catalog