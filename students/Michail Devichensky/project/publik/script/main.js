
// const cartImage = 'https://placehold.it/100x80'
// const image = 'https://placehold.it/200x150'
// const FAKEAPI = 'https://raw.githubusercontent.com/invector4ik002/myJSON/master'
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
//пилим босса
const app = new Vue({
   el: '#app',
    data: {
        // cartUrl:`/getBasket.json`,//ссылка для url для корзинки
        userSearch:'',
    },
    methods: {//методы Vue
        getJSON(url){//первая функция это получение и обработка данных с сервера
            return fetch(url)//собственно метод
               .then(result => result.json())//получили обработали в джинсон
               .catch(error => console.log(error))//упал сервак держи
        },
        postJSON(url, data){//первая функция это получение и обработка данных с сервера
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })//собственно метод
               .then(result => result.json())//получили обработали в джинсон
               .catch(error => console.log(error))//упал сервак держи
        },
        putJSON(url, data){//первая функция это получение и обработка данных с сервера
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })//собственно метод
               .then(result => result.json())//получили обработали в джинсон
               .catch(error => console.log(error))//упал сервак держи
        },
        
    },
});

