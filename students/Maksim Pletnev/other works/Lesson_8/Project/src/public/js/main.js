import cart from './cart'
import catalog from './catalog'
import filterComp from './filter'

let app = new Vue({
    el: '#app',
    components: {
        'catalog': catalog,
        'cart': cart,
        'filter-comp': filterComp
    },
    data: {
        API: 'https://raw.githubusercontent.com/berryllium/-js-gb-second-05.10/gorkun/students/Gorkun%20Dmitriy/project/db',
        isVisibleCart: true
    },

    methods: {
        getJson (url) {
            return fetch (url)
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        postJson (url, data) {
            return fetch (url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            })
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },
        putJson (url, data) {
            return fetch (url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            })
            .then (result => result.json())
            .catch (err => {
                console.log (err)
            })
        },  
    },
    mounted() {

    }
})

export default app