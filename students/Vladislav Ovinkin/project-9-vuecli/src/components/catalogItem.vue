<template>
<div class="product-item">
    <img :src="el.img" alt="Some img">
    <div class="desc">
        <h3>{{ el.product_name }}</h3>
        <p>{{ el.price }}$</p>
        <button class="buy-btn" @click="$root.$children[0].$refs.cartComp.addProduct (el)">Купить</button>
    </div>
</div>
</template>

<script>
export default {
    props: ['el'],
    data: function () {
        return {

        }
    }
}
</script>