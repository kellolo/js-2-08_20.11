new Vue ({
    el: "#app",
    data: {
        urlListProducts: 'https://raw.githubusercontent.com/AnnaTokareva55/js-2-08_20.11/master/students/Anna%20Tokareva/project/products.json',
        products: [],
        cart: [],
        toggleCart: false    
    },
    methods: {
        makeRequest (url) {
            fetch (url)
                .then(data => data.json())
                .then(data => this.products = data)
                .catch(() => alert(`Ошибка загрузки данных с сервера`));
        },
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
        this.makeRequest(this.urlListProducts);
    }
});