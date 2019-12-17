
Vue.component ('catalog', {
    template: `<div class="products">
    <catalog-item v-for="item in products" :img="image" :el="item" :key="item.id_product"/>
    </div>`,
    data() {
        return {
            image: 'https://placehold.it/200x150',
        }
    },
    props: ['products'],
    methods: {

    }
})