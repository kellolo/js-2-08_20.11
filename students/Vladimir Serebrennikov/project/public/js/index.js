import cart from './Cart.js'
import cartItem from './CartItem.js'
import catalog from './Catalog.js'
import catalogItem from './CatalogItem.js'


let app = new Vue({
  el: "#app",
  data: {
      ss: [
          1, 2, 3, 4
      ]
  }
})

document.querySelector('.btn-cart').addEventListener('click', () => {
  document.querySelector('.cart-block').classList.toggle('invisible');
});

console.log(cart)