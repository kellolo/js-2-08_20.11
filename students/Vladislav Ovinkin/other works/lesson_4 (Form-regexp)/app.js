/*
* Создать форму обратной связи с полями: ​ Имя​ , ​ Телефон​ , ​ E-mail​ , текст, кнопка ​ Отправить​ .
При нажатии на кнопку ​ Отправить​ произвести валидацию полей следующим образом:
a. Имя содержит только буквы.
b. Телефон имеет вид +7(000)000-0000.
c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
d. Текст произвольный.
e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой
и сообщить пользователю об ошибке.
*/

'use strict';

class Validator {
    constructor () {
        this.inputName = document.querySelector ('#name');
        this.inputPhone = document.querySelector ('#phone');
        this.inputEmail = document.querySelector ('#email');
        this.inputMessage = document.querySelector ('#message');

        this.buttonSend = document.querySelector ('#send');

        this.element = [
            this.inputName,
            this.inputPhone,
            this.inputEmail,
            this.inputMessage,
        ];
        
        this.hintElement = [
            'eName',
            'ePhone',
            'eEmail',
            'eMessage',
        ];

        this.regexpArr = [
            /^[a-zа-яё]+$/i,
            /^(\+{1}7{1}\({1}\d{3}\){1}\d{3}-{1}\d{4})$/,
            /^([a-z0-9\.-]+)@([a-z0-9]+)\.([a-z]{2,6})$/,
            /.?/,
        ];

        this.hintMessage = [
            'содержит только буквы',
            'имеет вид +7(000)000-0000',
            'имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru',
            'можно всё ;)',
        ];

        this._init ();
    }
    _init () {
        this._displayHintMessages ();
        this._initElementsStyles ();
        this._addEventListeners ();
    }
    _displayHintMessages () {
        this.hintElement.forEach ((el, idx) => {
            let hint = document.getElementById(el);
            hint.innerText = this.hintMessage [idx];
        })
    }
    _initElementsStyles () {
        this.element.forEach ((el, idx) => {
            let result = this.regexpArr[idx].test(el.value);
            let hint = document.getElementById(this.hintElement[idx]);
            this.changeElementsStyles (el, hint, result);    
        })
    }
    _addEventListeners () {
        this.element.forEach ((el, idx) => {
            el.addEventListener ('keyup', () => this.checkField(el, idx));
        })
    }
    checkField (el, index) {
        let hint = document.getElementById(this.hintElement[index]);
        let result = this.regexpArr[index].test(el.value);
        this.changeElementsStyles (el, hint, result);
        this.setButtonAccessMode ();
    }
    changeElementsStyles (el, hint, result) {
        if (result) {
            el.style.boxShadow = "1px 1px 5px #00ff00";
            hint.classList.remove ('text-red');
        } else {
            el.style.boxShadow = "1px 1px 5px #ff0000";
            hint.classList.add ('text-red');
        }
    }
    setButtonAccessMode () {
        if (this.checkErrors ()) {
            this.buttonSend.setAttribute('disabled', '');
        } else {
            this.buttonSend.removeAttribute('disabled');
        }
    }
    checkErrors() {
        let err = false;
        this.hintElement.forEach (id => {
            let hint = document.getElementById(id);
            if (hint.classList.contains ('text-red')) {
                err = true;
            }
        });
        return err;
    }
}

let inspector = new Validator ();