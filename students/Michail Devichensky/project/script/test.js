<<<<<<< HEAD
let products = new Vue ({
    el: '.products',
    data: {
        DTOarr:
        // arr:[
        //     {
        //       "id_product": 1,
        //       "img": "https://placehold.it/200x150",
        //       "price": 1000,
        //       "quantity": 0,
        //       "product_name": "Notebook"
        //     }     
        // ]
        
    },
    // methods: {
    //     getJSON(url) { //аформление запросов  
    //         return fetch(url)
    //         .then(d => d.json())
    //         .catch(err => {console.log(err)})
    //         .finally((data) => this.DTOarr = data)
    //     }
    // },
    // // computed: {
        
    //     // },
    //     mounted() {
    //         this.getJSON('https://raw.githubusercontent.com/invector4ik002/myJSON/master/myJSON.json') 
    //         .then(data => this.DTOarr = data)    
    // }
})
=======
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
>>>>>>> 589a7a787fe2623a841f399a2d0a5e478b6614b5
