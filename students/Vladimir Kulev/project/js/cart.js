let doc = document

class fillProduct {
    constructor() {
        this.url = 'https://raw.githubusercontent.com/VladimirKul/online-store-api/master/responses/catalogData.json'
        this.product = []
        this.getRequest(this.url)
    }

    getRequest(url) {
        fetch(url).then(data => data.json()).then(data => {
            this.product = data
            new renderCatalog(this.product)
        })
    }

    filterProduct(evt) {
        if (evt.target.classList.contains('btn-filter')) {
            let inp_filter = doc.querySelectorAll('.inp-filter')
            let arr_rad = doc.querySelectorAll('.radio-sort')
            let arr_filter = catalog.product.concat()
            let inp_filter_sec = +inp_filter[0].value
            let inp_filter_fir = +inp_filter[1].value

            if (inp_filter_fir == 0) {
                inp_filter_fir = 100000000
            }


            let filtered = arr_filter.filter((item => {
                return item.price >= inp_filter_sec && item.price <= inp_filter_fir
            }))

            if (arr_rad[0].checked) {
                filtered.sort((prev, next) => prev.price - next.price)
            }

            if (arr_rad[1].checked) {
                filtered.sort((prev, next) => next.price - prev.price)
            }

            new renderCatalog(filtered)
        }
    }

}

class renderCatalog {
    constructor(arr) {
        this._render(arr)
    }

    _render(arr) {
        doc.querySelector('.wrap-product').innerHTML = ''
        let i = 0
        for (i in arr) {
            doc.querySelector('.wrap-product').innerHTML += `
                <div class="product-item">
                <img src="http://placehold.it/200x200" alt="img" class="img-product-item">
                <p class="name-product-item">${arr[i].name}</p>
                <p class="price-product-item">${arr[i].price} &#36;</p>
                <input type="button" value="BUY" class="btn-product-item"
                    data-id="${arr[i].id}" data-name="${arr[i].name}" data-price="${arr[i].price}">
                </div>
            `
        }
    }
}

class fillCart {
    constructor() {
        this.arrCart = []
        this.sumCart = null
    }

    addProductCart(evt) {
        let target = evt.target
        let btn_buy_target = target.classList.contains('btn-product-item')
        if (btn_buy_target) {
            let find_el = cart.arrCart.find(function(el) {
                if (el.id == target.dataset.id) {
                    return el
                }
            })

            if (find_el) {
                find_el.count++
            } else {
                cart.arrCart.push(new fillProductItem(target.dataset.id, target.dataset.name, target.dataset.price))
            }
            cart.sumCart += +target.dataset.price
            doc.querySelector('.wrap-cart').innerHTML = `<input type="button" value="X" class="close-cart">` + new RenderCart(cart.arrCart).str + `<h2 class="amount">Total amount: ${cart.sumCart}&#36; </h2> `
        }
    }

    subProductCart(evt) {
        let target = evt.target
        let btn_buy_target = target.classList.contains('btn-delete-product')
        if (btn_buy_target) {
            let find_el = cart.arrCart.find((el) => {
                if (el.id == target.dataset.id) {
                    return el
                }
            })

            if (find_el.count > 1) {
                find_el.count--
            } else {
                cart.arrCart.splice(cart.arrCart.indexOf(find_el), 1)
            }
            cart.sumCart -= +target.dataset.price
            doc.querySelector('.wrap-cart').innerHTML = `<input type="button" value="X" class="close-cart">` + new RenderCart(cart.arrCart).str + `<h2>Total amount: ${cart.sumCart}&#36; </h2> `

        }
    }

    visibilityCart() {
        let vis_cart = doc.querySelector('.wrap-cart')
        vis_cart.style.visibility = 'visible';
    }

    closeCart(evt) {
        if (evt.target.classList.contains('close-cart')) {
            let vis_cart = doc.querySelector('.wrap-cart')
            vis_cart.style.visibility = 'hidden';
        }
    }

}

class RenderCart {
    constructor(arr) {
        this.str = this._render(arr)
    }
    _render(cart) {
        let str = ''
        cart.forEach((el) => {
            str += `
            <div class="cartt">
            <div class="wrap-item-cart">
                <div class="wrap-desc">
                    <img src="http://placehold.it/75x75" alt="img">
                    <p class="cart-name-product">${el.name}</p>
                    <p class="cart-price-prduct">${el.price} &#36;</p>
                </div>
                <div class="wrap-calc">
                    <p class="cart-count-prduct">count: ${el.count}</p>
                    <p class="cart-sum-product">amount: ${el.price*el.count}</p>
                    <input type="button" value="+" class="btn-product-item"
                        data-id="${el.id}" data-name="${el.name}" data-price="${el.price}">
                    <input type="button" value="-" class="btn-delete-product"
                        data-id="${el.id}" data-name="${el.name}" data-price="${el.price}">
                </div> 
            </div>
            
            </div>
            `
        })
        return str
    }
}

class fillProductItem {
    constructor(id, name, price) {
        this.id = id
        this.name = name
        this.price = price
        this.count = 1
    }
}

let catalog = new fillProduct
let cart = new fillCart

doc.querySelector('.wrap-product').addEventListener('click', cart.addProductCart)
doc.querySelector('.wrap-cart').addEventListener('click', cart.addProductCart)
doc.querySelector('.wrap-cart').addEventListener('click', cart.subProductCart)
doc.querySelector('.btn-cart').addEventListener('click', cart.visibilityCart)
doc.querySelector('.wrap-cart').addEventListener('click', cart.closeCart)
doc.querySelector('.btn-filter').addEventListener('click', catalog.filterProduct)