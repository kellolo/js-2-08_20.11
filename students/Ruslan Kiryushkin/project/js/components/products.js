let Producstlisturl = ""

Vue.component ('products', {
	data () {
		return {
			Producstlisturl: 'https://raw.githubusercontent.com/RusKir/jslvl2/master/catalogData.json',
        	products: []
		}
	},
	template: `<div class="products">
					<product-item v-for="product in products" :product="product" :key="product.id">
					</product-item>
				</div>`,
	mounted () {
        this.$parent.getJSON(this.Producstlisturl)
        	.then(data => this.products = data);
    }
});