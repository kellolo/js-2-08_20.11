let app = new Vue ({
    el: '#app',
    data: {
        idProductsVisible: true,
    },
    methods: {
        getJSON (url) {
            return fetch (url)
                .then (d => {
                    if(!this.idProductsVisible)
                     this.idProductsVisible = true

                    return d.json()
                })
                .catch(() => {this.idProductsVisible = false})
        }
    }
})