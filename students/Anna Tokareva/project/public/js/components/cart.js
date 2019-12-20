Vue.component ('cart', {
	data () {
		return {
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
                let addproduct = Object.assign({}, product, {quantity: 1});
                this.$parent.postJSON('/api/cart', addproduct)
                    .then(data => {
                        if (data.result) {
                            this.cart.push(addproduct);
                        }
                    });
            } else {
                this.$parent.putJSON(`/api/cart/:${find.id}`, {quantity: 1})
                    .then(data => {
                       if (data.result) {
                            find.quantity++;
                        }
                    });
            }
            /*
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
            */
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
        this.$parent.getJSON('/api/cart')
        	.then(data => this.cart = data);
    }
});