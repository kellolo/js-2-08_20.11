//import catalogItem from './CatalogItem'
Vue.component('catalog', {
    props: ["name"],
    data () {
        return {
            items: [],
            imgCatalog: 'https://placehold.it/200x150',
            catalogUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
        }
    },
    // methods: {
    //     addProduct (product) {
    //         console.log (product.product_name)
    //         console.log(this.name)
    //         console.log(this.items)
           
            
        //     let find = this.items.find(element => element.product_name === product.product_name);
        //     console.log(product.product_name)
        //     console.log(cartitems)
        //     if (find) {
        //         this.items.push(product)
        //         console.log("yew")
             
        //    }  
        //    else {
        //       find.quantity++
        //     }
    //     }
    // },
    mounted () {
        this.$parent.getJSON (this.catalogUrl)
            .then (data => this.items = data)
    },
    template: `
    <div class="products">
        <catalog-item v-for="product of items" 
        :img="imgCatalog" :el="product" :key="product.id_product"/>
    </div>
    `,
    // components: {
    //     'catalog-item': catalogItem
    // }
})

//export default catalog
