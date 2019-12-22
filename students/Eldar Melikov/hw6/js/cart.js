Vue.component ('cart-item', {
    props: [ 'product' ],
    data () {
        return {
            cartImage: 'https://placehold.it/100x80'
        }
    },
    template: `
        <div class="cart-item" >
            <div class="product-bio">
                <img :src="cartImage" alt="Some image">
                <div class="product-desc">
                    <p class="product-title">{{product.name}}</p>
                    <p class="product-quantity">Quantity: {{product.quantity}}</p>
                    <p class="product-single-price">{{product.price}} each</p>
                </div>
            </div>
            <div class="right-block">
                <p class="product-price">{{product.quantity * product.price}} $</p>
                <button class="del-btn" :data-id="product.id" @click="$parent.outFromCart(product)">&times;</button>
            </div>
        </div>
    `
})

Vue.component ('cart-block', {
    props: [],
    data () {
        return {
            selected: []
        }
    },
    async mounted () {
        this.$root.$on('refreshCart', function () {
            if (typeof(this.$root.$refs.cabl) != 'undefined')
                this.$root.$refs.cabl.refreshCart();
        });
        this.refreshCart();
    },
    template: `
        <div class="cart-block" v-if="$parent.openCart" >
            <div v-if="selected.length == 0">Корзина пуста!</div>
            <cart-item v-for="product in selected" :key="product.quantity + product.name" :product="product" ></cart-item>
        </div>
            
    `,
    methods: {
        refreshCart(){
            this.selected = this.$parent.products.filter(el => typeof(el.quantity) != 'undefined' && el.quantity > 0);
        },
        outFromCart (product) {
            --product.quantity;
            this.refreshCart();
        }
    },
})