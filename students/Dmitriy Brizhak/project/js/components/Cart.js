Vue.component('cart', {
    props: ['items'],
    data () {
        return {
            isVisibleCart: true,
            imgCart: 'https://placehold.it/100x80',
        }
    },
    template: `
    <div class="inline">
        <button class="btn-cart" type="button" v-on:click="isVisibleCart = !isVisibleCart">Корзина</button>
        <div class="cart-block " :class="{ invisible: isVisibleCart }">
            <cart-item v-for="product of items" :img="imgCart" :el="product" :key="product.id_product"/>
        </div>
    </div>
    `,
})