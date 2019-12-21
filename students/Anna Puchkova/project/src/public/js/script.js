import error from './ErrorComponent.js';
import cart from './CartComponent.js';
import products from './ProdComponents.js';

import search from './SearchComponent.js';

let app = {
    el: '#app',
    components: {
        'cart' : cart,
        'products' : products,
        'error' : error,
        'search' : search
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                    console.log(error);
                })

        },

        postJson(url, data) {
            return fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                    console.log(error);
                })

        },
        putJson(url, data) {
            return fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                    console.log(error);
                })

        },
        delJson(url, data) {
            return fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                    console.log(error);
                })

        }

    }

};

export default app;
