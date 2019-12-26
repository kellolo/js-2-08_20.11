const app = new Vue ({
    el: "#app",
    methods: {
        getJSON (url) {
            return fetch (url)
                    .then(data => data.json())
                    .catch(() => alert(`Ошибка загрузки данных с сервера`));
        },
        postJSON (url, postData) {
            debugger;
            return fetch (url, {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(postData)
            })
            .then (data => data.json())
            .catch(() => alert(`Ошибка обращения к корзине`));
        },
        putJSON (url, putData) {
            debugger;
            return fetch (url, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({quantity: putData})
            })
            .then (data => data.json())
            .catch(() => alert(`Ошибка обращения к корзине`));
        },
        deleteJSON (url) {
            return fetch (url, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
            })
            .then (data => data.json())
            .catch(() => alert(`Ошибка обращения к корзине`));
        }
    }
});