Vue.component ('cart', {
	data () {
		return {
			urlListCart: 'https://raw.githubusercontent.com/AnnaTokareva55/js-2-08_20.11/master/students/Anna%20Tokareva/project/cart.json',
        	cart: [],
        	toggleCart: false
		}
	},
	template: `<div class="div-cart"><button class="btn-cart" type="button" @click="showCart">Корзина</button>
					<div v-show="toggleCart" class="cart-block">
					<cart-product v-for="item in cart" :item="item" :key="item.id"></cart-product>
	            	</div>
	            </div>`,
	methods: {
		showCart () {
            this.toggleCart = !this.toggleCart;
        },
        addProduct (product) {
            let find = this.cart.find(item => item.id === product.id);
            if (!find) {
                let addproduct = {
                title: product.title,
                id: product.id,
                image: product.cartImage,
                price: product.price,
                quantity: 1
            }
                this.cart.push(addproduct);
            } else {
                find.quantity++;
            };
        },
        removeProduct (product) {
            let find = this.cart.find(item => item.id === product.id);
            if (find.quantity > 1) {
                find.quantity--;
            } else {
                this.cart.splice(this.cart.indexOf(find), 1);
            }
        }
	},
	mounted () {
        this.$parent.getJSON(this.urlListCart)
        	.then(data => this.cart = data);
    }
});