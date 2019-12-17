Vue.component('cart',{
    //props:['cartItems','img', 'visibility'],
    data(){
        return {
            showCart: false,          
            items:[],
            cartUrl:`/getBasket.json`,
            cartImage:`https://placehold.it/100x80`,
        }
    },
    methods:{
        addProduct(product){
            let find = this.items.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJSON(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result){
                            find.quantity++
                        }
                    })
            }else{
                let prod = Object.assign({quantity: 1},product);      
                this.$parent.postJSON(`api/cart`, prod)
                .then(data=> {
                    if(data.result){
                        this.items.push(prod);
                    }
                })
            }

            // this.$parent.getJSON(`${API}/addToBasket.json`)
            // .then(data => {
            //     if(data.result){
            //         let find = this.items.find(el => el.id_product === product.id_product);
            //         if(find){
            //             find.quantity++;
            //         }else{
            //             let prod = Object.assign({quantity: 1},product);
            //             this.items.push(prod);
            //         }
            //     }else{
            //         console.log('error');
            //     }
            // })
        },
        remove(product){
            this.$parent.getJSON(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result){
                    if(product.quantity > 1){
                        product.quantity--;
                    }else{
                        this.items.splice(this.items.indexOf(product), 1);
                    }
                }else{
                    console.log('error');
                }
            })
        },
    },
    mounted(){
        this.$parent.getJSON(`/api/cart`)
        .then(data => {
           for(let el of data.contents){
               this.items.push(el)
           }
        });
    },
    // :key="item.id_product" используем для связки элементов которые будем отображать помогает избежать дублей.
    // v-for="item of items" генерируем item из массива items . пербор массива.
    temlate: `<div>
                <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                    <div class="cart-block" v-show="showCart">
                        <p v-if="!items.length">Корзина пуста</p>
                        <cart-item
                        v-for="item of items"
                        :key="item.id_product"
                        :items="item"
                        :img="img"
                        @remove="remove"></cart-item>
                    </div>
                </div>`
});
// Важно! Для пропсов пишущихся камелКейсом в атрибутах при пробросе используется кибап-кейс
// Пример:  props:['cartItem','img'], === :cart-item>
Vue.component('cart-item', {
    props:['items','img'],
    temlate:`<div class="cart-item">
                <div class="product-bio">
                   <img :src="img" alt="Some image">
                   <div class="product-desc">
                       <p class="product-title">{{ items.title }}</p>
                       <p class="product-quantity">Quantity: {{ items.quantity }}</p>
                       <p class="product-single-price">{{ items.price }} each</p>
                   </div>
                </div>
                <div class="right-block">
                    <p class="product-price">{{ items.quantity * items.price }}</p>
                    <button class="del-btn" @click="$emit('remove', items)">&times</button>
                </div>
            </div>`       
});
// @click="$parent.$emit('remove') регистрация события в родителе родителя что бы зарегистрировать событие в глобальном vue.
//@click="$parent.$emit('remove', cartItem)  cartItem - пробрасываем в не ивент а картайтем