//import catalogItem from './CatalogItem'
Vue.component('cart', {
  data() {
    return {
      items: [],
      imgCart: 'https://placehold.it/100x80',
      //cartUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
      cartUrl: '/api/getBasket',
      updateCartUrl: '/api/updateBasket',
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = !this.visible
    },
    addProduct(product) {
      let productId = +product.id_product;
      let find = this.items.find(element => element.id_product === productId);
      if (!find) {
        this.items.push({
          product_name: product.product_name,
          id_product: product.id_product,
          price: +product.price,
          quantity: 1
        })
      } else {
        find.quantity++
      }
      this.$parent.sendJSON(this.updateCartUrl, this.items)
    },
    removeProduct(product) {
      let productId = +product.id_product;
      let find = this.items.find(element => element.id_product === productId);
      find.quantity--;
      if (find.quantity < 1) {
        let position = this.items.indexOf(find)
        this.items.splice(position, position)
      }
      this.$parent.sendJSON(this.updateCartUrl, this.items)
    }
  },
  mounted() {
    this.$parent.getJSON(this.cartUrl)
      .catch(err => this.$parent.$children[2].viewError("Ошибка загрузки корзины: " + err))
      .then(data => this.items = data.contents)

  },
  template: `
    <div class="cart-block" v-show="visible">
        <cart-item v-for="product of items" :img="imgCart" :el="product" :key="product.id_product"/>
    </div>
    `,
  // components: {
  //     'catalog-item': catalogItem
  // }
})

//export default catalog