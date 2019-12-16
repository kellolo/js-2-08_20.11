Vue.component ('products', {
	data () {
		return {
			catalogUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
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