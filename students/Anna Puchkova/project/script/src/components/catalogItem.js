Vue.component('catalog-item', {
    props: ['img', 'item'],
    template: `
    <div class="product-item">
        <img :src="img" alt="Some img">
        <div class="desc">
            <h3>{{ item.product_name }}</h3>
            <p>{{ item.price }} $</p>
            <button class="buy-btn" @click="$parent.$parent.addItem(item)">Купить</button>
        </div>
    </div>`
}) 