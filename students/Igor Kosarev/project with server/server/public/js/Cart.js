//import catalogItem from './CatalogItem'
Vue.component('cart', {
  data() {
    return {
      items: [],
      amount: 0,
      countGoods: 0,
      imgCart: 'https://placehold.it/100x80',
      //cartUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
      cartUrl: '/api/getCart',
      //updateCartUrl: '/api/updateBasket',
      updateCartUrl: '/api/addCartItem',
      deleteCartUrl: '/api/deleteCartItem',
      createCartUrl: '/api/createCart',
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = !this.visible
    },
    addProduct(product) {
      let productId = +product.id_product;
      let event = null;
      let empty = false;
      let find = this.items.find(element => element.id_product === productId);
      event = {
        product_name: product.product_name,
        id_product: product.id_product,
        price: +product.price,
        quantity: 1
      }
      if (!find) {
        this.items.push(event)
        empty = true
      } else {
        find.quantity++
      }
      console.log(event)
      if (!empty) {
        this.$parent.putJSON(this.updateCartUrl, event)
          .catch(err => this.$parent.$children[2].viewError("Ошибка сохранения корзины: " + err))
        this.updateCountersOnFront()
      } else {
        event = [event]
        this.$parent.postJSON(this.createCartUrl, event)
          .catch(err => this.$parent.$children[2].viewError("Ошибка сохранения корзины: " + err))
        this.updateCountersOnFront()
      }

    },
    removeProduct(product) {
      let productId = +product.id_product;
      let event = null;
      let find = this.items.find(element => element.id_product === productId);
      event = {
        product_name: product.product_name,
        id_product: product.id_product,
        price: +product.price,
        quantity: 1
      }
      find.quantity--;
      if (find.quantity < 1) {
        let position = +this.items.indexOf(find)
        this.items.splice(position, position)
          //*тут небольшие костыли для удления нулевого элемента массива с помощью splice
        if (position === 0) {
          this.items.splice(0, 1)
        }
      }
      // console.log(event)
      this.$parent.deleteJSON(this.deleteCartUrl, event)
        .catch(err => this.$parent.$children[2].viewError("Ошибка сохранения корзины: " + err))
      this.updateCountersOnFront()
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