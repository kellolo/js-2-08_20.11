//import catalogItem from './CatalogItem'
Vue.component('cart', {
  data() {
    return {
      items: [],
      amount: 0,
      countGoods: 0,
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
        .catch(err => this.$parent.$children[2].viewError("Ошибка сохранения корзины: " + err))
      this.updateCounters()
    },
    removeProduct(product) {
      let productId = +product.id_product;
      let find = this.items.find(element => element.id_product === productId);
      find.quantity--;
      if (find.quantity < 1) {
        let position = +this.items.indexOf(find)
        this.items.splice(position, position)
          //*тут небольшие костыли для удления нулевого элемента массива с помощью splice
        if (position === 0) {
          this.items.splice(0, 1)
        }
      }

      this.$parent.sendJSON(this.updateCartUrl, this.items)
        .catch(err => this.$parent.$children[2].viewError("Ошибка сохранения корзины: " + err))
      this.updateCounters()
    },
    updateCounters() {
      //*Тут берём расчёт с back-end
      this.$parent.getJSON(this.cartUrl)
        .catch(err => {
          this.$parent.$children[2].viewError("Ошибка загрузки расчёта корзины: " + err)
            //*Тут производим расчёт на стороне front-end если при загрузке данных возникает ошибка, чтобы пользователь не страдал
          this.updateCountersOnFront()
        })
        .then(data => {
          this.amount = data.amount
          this.countGoods = data.countGoods

        })
    },
    updateCountersOnFront() {
      this.amount = 0
      this.countGoods = 0
      for (el of this.items) {
        this.amount += el.price * el.quantity
        this.countGoods += el.quantity
      }
    }
  },
  mounted() {
    this.$parent.getJSON(this.cartUrl)
      .catch(err => this.$parent.$children[2].viewError("Ошибка загрузки корзины: " + err))
      .then(data => {
        this.items = data.contents
        this.amount = data.amount
        this.countGoods = data.countGoods
      })

  },
  template: `
    <div class="cart-block" v-show="visible">
        <cart-item v-for="product of items" :img="imgCart" :el="product" :key="product.id_product"/>
        <p>Всего товаров: {{this.countGoods}} шт.</p>
        <p>На сумму: {{this.amount}} рублей</p>
    </div>
    `,
  // components: {
  //     'catalog-item': catalogItem
  // }
})

//export default catalog