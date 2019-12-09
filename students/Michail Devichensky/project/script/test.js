// let url_items = 'https://raw.githubusercontent.com/invector4ik002/myJSON/master/myJSON.json'
// let arrItems
// fetch(url_items)
//     .then(d => d.json())
//     .then(data => {arrItems = data})
//     .finally (() => console.log(arrItems))
let add = new Vue ({
    el: '#prod-vue',
    data: {
        incomingURL: [{
            "id_product": 1,
            "img": "https://placehold.it/200x150",
            "price": 1000,
            "quantity": 0,
            "product_name": "Notebook"
          }]            
    },
    methods: {

    }
})
