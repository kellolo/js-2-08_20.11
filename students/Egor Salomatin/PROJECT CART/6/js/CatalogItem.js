Vue.component('catalog-item', {
    props: ['el'],
    template: `<div class="product-item" v-bind:data-id="el.id">
                    <img v-bind:src="el.img" alt="Some img">
                    <div class="desc">
                        <h3>{{ el.item }}</h3>
                        <p>{{ el.price }}</p>
                        <button class="buy-btn" v-bind:data-id="el.id" v-on:click="$parent.addProductToCart($event)">Купить</button>
                    </div>
                </div>`
})