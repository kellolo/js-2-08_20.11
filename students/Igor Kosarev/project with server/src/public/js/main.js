//const FAKEAPI = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'
import catalog from './Catalog'
import cart from './Cart'
import error from './Error'

let app = {
  el: '#app',
  data: {
    //catalogUrl: '/catalogData.json',
    //products: [],
    //cartItems: []
    // err: '',
    // filter: ''
  },
  methods: {
    getJSON(url) {
      return fetch(url)
        .then(d => d.json())
    },
    postJSON(url, data) {
      return fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          keepalive: false,
          body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
        })
        // .then((response) => {
        //   console.log(response)
        // })
    },

    putJSON(url, data) {
      return fetch(url, {
          method: 'PUT',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          keepalive: false,
          body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
        })
        // .then((response) => {
        //   console.log(response)
        // })
    },

    deleteJSON(url, data) {
      return fetch(url, {
          method: 'DELETE',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          keepalive: false,
          body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
        })
        // .then((response) => {
        //   console.log(response)
        // })
    },


    showCart() {
      this.$children[0].show()
    }
  },
  mounted() {

  },
  components: {
    'catalog': catalog,
    'cart': cart,
    'error': error
  }

}

export default app