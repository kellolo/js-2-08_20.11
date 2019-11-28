let url = 'https://raw.githubusercontent.com/KirylJazzSax/js-2-08_20.11/js_lvl_2_async/students/KirylMatsenka/my-json.json'
let resultContainer = document.getElementById ('json-data')
let button = document.getElementById ('parse-it')


class Response {
    constructor (url) {
        this.url = url
    }

    showResponse () {
        return fetch (this.url)
        .then (data => data.json())
        .then (users => users.forEach(user => {
            resultContainer.innerHTML += this._render (user)
        }))
        .catch (error => resultContainer.innerText = error) 
    }

    _render (user) {
        let result = `<p>Пользователь id: ${user.id}, имя: ${user.name},
        фамилия: ${user.last_name}, характеристика: ${user.description}` 

        user.extra ? result += `<br> Дополнительно: ${user.extra}</p>` : result += `</p>`

        return result
    }
}

let response = new Response (url)

button.addEventListener ('click', () => { response.showResponse ()})
