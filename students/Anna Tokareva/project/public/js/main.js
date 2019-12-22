const app = new Vue ({
    el: "#app",
    methods: {
        getJSON (url) {
            return fetch (url)
                    .then(data => data.json())
                    .catch(() => alert(`Ошибка загрузки данных с сервера`));
        },
        postJSON (url, postData) {
            return fetch (url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            })
            .then (data => data.json());
        },
        putJSON (url, putData) {
            return fetch (url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(putData)
            })
            .then (data => data.json());
        },
        /*
        deleteJSON (url) {
            
        }
        */
    }
});