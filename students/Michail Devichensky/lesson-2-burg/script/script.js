let uForm = document.querySelector('#userform')
let btn = document.querySelector('#ok')
let users = []
btn.addEventListener('click', addUser)

function addUser() {
    let newUser = new User('Name', 'Age', 'Gender', 'Hobbie')
    users.push(newUser)
}
class User {
    constructor(name, age, gender, hobbies) {
        this.Name = this._input(name)
        this.Age = this._input(age)
        this.Gender = this._check(gender)
        this.Hobbies = this._getHobbies(hobbies)//из чекбоксов приходит массив данных так как выбрать можно все или некоторые
    }
    /**
     * Возвращает занчение object.
     * Метод инкапсюляции
     * @param {атрибут} attrName 
     */
    _input(attrName) {
       let object = document.querySelector(`input[name=${attrName}]`)//`input[name=${attrName}]`сюда приходит атрибут который мы сюда запишем
       return object.value
    }
    /**
     * Приставка:checked отмечает выбранный input и снего получает данные.
     * Возвращает занчение object.
     * @param {атрибут} attrName 
     */
    _check(attrName) {
        let object = document.querySelector(`input[name=${attrName}]:checked`)
        return object.value
    }
    /**
     * Со всех input получаем массив данных и выводим значения в массив его и ретюрним
     * @param {атрибут} attrName 
     */
    _getHobbies(attrName) {
        let hobs = []
        let arr = [...document.querySelectorAll(`input[name=${attrName}]:checked`)]
        arr.forEach(el => hobs.push(el.value))
        return hobs
    }
}