import catalog from './Catalog'
import cart from './cart'

let app = {
    el: '#app',
    methods: {
        getJSON(url) {
            return fetch(url)
                .then (d => d.json())
                .catch(() => console.log('error loading data'))
        },
        postJSON(url, obj) {
            return fetch(url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(obj)
            })
                .then (d => d.json())
        },
        putJSON(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({some: data})
            })
                .then(d => d.json())
        },
        deleteJSON(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
            })
                .then(d => d.json())
        }
    }
}