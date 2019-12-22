//Задание 1,2
let  reg = /\B'|'\B/g
let str = "'Lorem' ipsum dolor si't 'amet', consectetur ad'ipiscin'g elit, sed do eiusm'od tempor 'incididunt' ut labore et do'lo're magna aliqua." 
let str1 = str.replace(reg, `"`)
console.log (`Исходный текст:\n${str}\nОбработанный текст:\n${str1}`)

//Задание 3
class ValidForm {
    constructor(form){
        this.form = form
        this.fl = false
        this.regexp = {
            name: /^[a-zA-Zа-яА-Я]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w.-]+@\w+\.[a-z]{2,6}$/
        }
        this.rules = {
            name: 'Следуйте шаблону John. Имя может содержать только буквы.',
            phone: 'Следуйте шаблону +7(000)000-0000',
            email: 'Следуйте шаблону mymail@mail.ru, my.mail@mail.ru, my-mail@mail.ru'
        }
        this._validate()
    }
    _validate(){
        let block = document.querySelector(this.form)
        let items = [... block.querySelectorAll('input')]
        items.forEach (el => {this._validateItem(el)})
        if (![... block.querySelectorAll ('.incorrect')].length) {
            this.fl = true
        }
    }
    _validateItem(item){
        let err = item.parentNode.querySelector (`.error`)
        let str = `<span class="error">${this.rules [item.name]}</span>`
        if (this.regexp [item.name]) {
            if (!this.regexp [item.name].test(item.value)) {
                item.classList.add ('incorrect')
                if (!err) item.parentNode.insertAdjacentHTML ('beforeend', str)
            } else {
                if (err) err.remove()
                item.classList.remove ('incorrect')
            }
        }
    }
}

document.querySelector('.form').addEventListener('submit', event => {
    let Valform = new ValidForm('.form');
    if(!Valform.fl){
        event.preventDefault();
    }
})
