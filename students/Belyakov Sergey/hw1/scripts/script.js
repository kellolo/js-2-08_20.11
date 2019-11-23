// список
const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50},
    { title: 'Jacket', price: 350},
    { title: 'Shoes', price: 250}
];

// рендер элемента списка
const renderGoodsItem = (title, price) => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`
};

// рендер списка
const renderGoodsList = (list = []) => {
    document.querySelector('.good-list')
        .innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join('');
};

renderGoodsList(goods);