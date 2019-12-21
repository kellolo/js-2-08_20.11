Vue.component ('products', {
	data () {
		return {
        	products: []
		}
	},
	template: `<div class="products">
					<product-item v-for="product in products" :product="product" :key="product.id">
					</product-item>
				</div>`,
	mounted () {
        this.$parent.getJSON('/api/catalog')
        	.then(data => this.products = data);
    }
});