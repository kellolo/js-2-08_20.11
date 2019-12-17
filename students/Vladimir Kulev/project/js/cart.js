let app = new Vue({
    el: '#app',

    data: {
        test: null,
        fakeapi: 'https://raw.githubusercontent.com/VladimirKul/online-store-api/master/responses',
        arrItems: [],
        arrItemsDTO: [],
        objCart: {
            amount: null,
            countGoods: null
        },
        arrCart: [],
        sumCart: null,
        visibilityCart: false,
        filterStart: null,
        filterEnd: null,
    },

    methods: {
        listProduct() {
            let req = this.getJSON(this.fakeapi + '/catalogData.json')
            req.then(data => {
                this.arrItems = data
                this.arrItemsDTO = this.arrItems
            })
        },

        listCart() {
            let req = this.getJSON(this.fakeapi + '/getBasket.json')
            req.then(data => rhis.arrCart = data)
        },

        getJSON(url) {
            return fetch(url)
                .then(d => d.json())
        },

        filterProduct() { //фильтр и сортировка

            this.arrItemsDTO = this.arrItems.filter((item => {
                if (this.filterEnd == '' || this.filterEnd == null) {
                    this.filterEnd = 100000000
                }
                return item.price >= +this.filterStart && item.price <= +this.filterEnd
            }))

            if (this.$refs.check_ask.checked) {
                this.arrItemsDTO.sort((prev, next) => prev.price - next.price)
            }

            if (this.$refs.check_desc.checked) {
                this.arrItemsDTO.sort((prev, next) => next.price - prev.price)
            }
        },

        addProduct(idItem, nameItem, priceItem, countItem) {
            let find_el = this.arrCart.find(function(el) {
                if (el.id == idItem) {
                    return el
                }
            })

            if (find_el) {
                find_el.count++
            } else {
                let item = {
                    id: idItem,
                    name: nameItem,
                    price: priceItem,
                    count: countItem
                }
                this.arrCart.push(item)
            }
            this.objCart.amount += +priceItem
            this.objCart.countGoods += countItem
            this.objCart.contents = this.arrCart
        },

        subProductCart(idItem) {
            let find_el = this.arrCart.find(function(el) {
                if (el.id == idItem) {
                    return el
                }
            })

            if (find_el.count > 1) {
                find_el.count--
            } else {
                this.arrCart.splice(this.arrCart.indexOf(find_el), 1)
            }

            this.objCart.amount -= +find_el.price
            this.objCart.countGoods += find_el.count
            this.objCart.contents = this.arrCart
        }
    },

    mounted() {
        this.listProduct()
    }
})