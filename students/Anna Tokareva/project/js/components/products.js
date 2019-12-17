Vue.component ('products', {
	data () {
		return {
			urlListProducts: 'https://raw.githubusercontent.com/AnnaTokareva55/js-2-08_20.11/master/students/Anna%20Tokareva/project/products.json',
        	products: []
		}
	},
	template: `<div class="products">
					<product-item v-for="product in products" :product="product" :key="product.id">
					</product-item>
				</div>`,
	mounted () {
        this.$parent.getJSON(this.urlListProducts)
        	.then(data => this.products = data);
    }
});