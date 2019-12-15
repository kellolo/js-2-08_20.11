'use strict';

Vue.component ('catalog-item', {
    props: ['el'],
    template: `
        <div class="product-item">
            <img :src="el.img" alt="Some img">
            <div class="desc">
                <h3>{{ el.product_name }}</h3>
                <p>{{ el.price }}$</p>
                <button class="buy-btn" @click="$parent.addProduct (el)">Купить</button>
            </div>
        </div>
    `,
})
// export default catalogItem;