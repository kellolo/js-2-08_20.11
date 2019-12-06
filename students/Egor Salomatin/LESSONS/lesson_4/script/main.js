'use strict'

// Первое задание. Сделал двумя способами

let text = `Lorem ipsum dolor sit amet 'consectetur' adipisicing elit. 
Dignissimos arn't hic voluptatem doloribus quisquam laboriosam 'reprehenderit' doloremque ducimus, saepe autem blanditiis. Give 'em a try.`

let regExp1 = /\s'/g;

let regExp2 = /'\s/g;

text = text.replace(regExp1, ` "` );
text = text.replace(regExp2, `" `)

console.log(text);

let text2 = `Lorem ipsum dolor sit amet 'consectetur' adipisicing elit. 
Dignissimos arn't hic voluptatem doloribus quisquam laboriosam 'reprehenderit' doloremque ducimus, saepe autem blanditiis. Give 'em a try.`

let regExp = /'[^\s]+'/g;
console.log(text2.match(regExp));

text2 = text2.replace(regExp, function(match) {
    console.log(match);
    let str = match.slice(1, match.length - 1);
    str = `"` + str + `"`;
    return str;
})

console.log(text2);

// Второе задание обработка формы

class FormFeedback {
    constructor (form ,name, tel, email, text) {
        this.form = document.querySelector(form);
        this.inputName = document.querySelector(name);
        this.inputTel = document.querySelector(tel);
        this.inputEmail = document.querySelector(email);
        this.inputText = document.querySelector(text);
    }

    submitEvent() {
        let data = {}
        console.log(this.inputName);
        if (this._nameIsValid(this.inputName.value)) {
            data.name = this.inputName.value
        }
        if (this._telIsValid(this.inputTel.value)) {
            data.tel = this.inputTel.value
        }
        if (this._emailIsValid(this.inputEmail.value)) {
            data.email = this.inputEmail.value
        }
        if ((data.name) && (data.tel) && (data.email)) {
            data.text = this.inputText.value;
            console.log("Полученные данные");
            console.log(data);
            this.inputName.value = "";
            this.inputTel.value = "";
            this.inputEmail.value = "";
            this.inputText.value = "";
        }
    }

    _nameIsValid(value) {
        let regExp = /^[a-zA-Zа-яА-я\s]+$/g;
        let res = value.match(regExp);
        if (res) {
            this.inputName.classList.remove("red-border");
            let nodeError = document.querySelector(".feedback-form__error-text-name");
            if (nodeError) {nodeError.remove()};
            return true;
        }
        else {
            let nodeError = document.createElement("p");
            nodeError.classList.add("feedback-form__error-text-name");
            nodeError.innerText = "Ошибка: Имя должно содержать только буквы";
            this.inputName.after(nodeError);
            this.inputName.classList.add("red-border");
            return false;
        }
    }

    _telIsValid(value) {
        let regExp = /^\+7\(\d{3}\)\d{3}-\d{4}$/g;
        let res = value.match(regExp);
        if (res) {
            this.inputTel.classList.remove("red-border");
            let nodeError = document.querySelector(".feedback-form__error-text-tel");
            if (nodeError) {nodeError.remove()};
            return true;
        }
        else {
            let nodeError = document.createElement("p");
            nodeError.classList.add("feedback-form__error-text-tel");
            nodeError.innerText = "Ошибка: Формат номера +7(000)000-0000";
            this.inputTel.after(nodeError);
            console.log(nodeError);
            this.inputTel.classList.add("red-border");
            return false;
        }
    }
    _emailIsValid(value) {
        let regExp = /^[a-zA-Z0-9\.-]+@[a-zA-Z0-9]+\.ru$/g;
        let res = value.match(regExp);
        if (res) {
            this.inputEmail.classList.remove("red-border");
            let nodeError = document.querySelector(".feedback-form__error-text-email");
            if (nodeError) {nodeError.remove()};
            return true;
        }
        else {
            let nodeError = document.createElement("p");
            nodeError.classList.add("feedback-form__error-text-email");
            nodeError.innerText = "Ошибка: Формат e-mail: mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru";
            this.inputEmail.after(nodeError);
            this.inputEmail.classList.add("red-border");
            return false;
        }
    }
 
    resetEvent() {
        this.inputName.value = "";
        this.inputTel.value = "";
        this.inputEmail.value = "";
        this.inputText.value = "";
    }

}

let formFeedback = new FormFeedback(".feedback-form", ".feedback-form__input-name", ".feedback-form__input-tel", ".feedback-form__input-email", ".feedback-form__textarea");
document.querySelector(".feedback-form__submit").addEventListener("click", function () {
    event.preventDefault();
    formFeedback.submitEvent();
});
document.querySelector(".feedback-form__reset").addEventListener("click", function () {
    event.preventDefault();
    formFeedback.resetEvent();
});

