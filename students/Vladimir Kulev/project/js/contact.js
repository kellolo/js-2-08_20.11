let inp_name = document.querySelector('input[name="name"]')
let inp_phone = document.querySelector('input[name="phone"]')
let inp_email = document.querySelector('input[name="email"]')
let inp_text = document.querySelector('textarea[name="text"]')
let err_field = document.querySelector('.err-mes')

class Contacts {
    constructor(type, reg) { //type - тип поля вводимой информации (имя, телефон, емайл) reg - регулярное выражение, примерняемое к полю
        this.type = type
        this.reg = reg
        this.inp_inf = ''
        this.error = ''
        this.errStatus = false
    }

    checkError() {
        if (this.errStatus) {
            err_field.innerHTML += this.error
        } else {
            return
        }
    }

    init() {
        return false
    }
}

class NameContact extends Contacts {
    constructor(type = inp_name, reg = /[a-z]/gi) {
        super(type, reg)
        this.error = 'Поле ИМЯ не заполнено или заполнено некорректно. Имя должно состоять только из латинских букв<br>'
    }

    init() {
        err_field.innerHTML = ''
        namec.inp_inf = namec.type.value
        let arr = namec.type.value.match(namec.reg)
        if (arr == null || arr.length != namec.type.value.length) {
            namec.type.style.backgroundColor = "#FA8072"
            namec.errStatus = true
        } else {
            namec.type.style.backgroundColor = "#47cf73"
            namec.errStatus = false
        }

        namec.checkError()
    }
}

class PhoneContact extends Contacts {
    constructor(type = inp_phone, reg = /^\+7\(\d\d\d\)\d\d\d\-\d\d\d\d/g) {
        super(type, reg)
        this.error = 'Поле ТЕЛЕФОН не заполнено или заполнено некорректно. Телефон должен имет вид +7(000)000-0000<br>'
    }

    init() {
        phone.inp_inf = phone.type.value
        let arr = phone.type.value.match(phone.reg)
        if (arr == null || arr[0].length != phone.type.value.length) {
            phone.type.style.backgroundColor = "#FA8072"
            phone.errStatus = true
        } else {
            phone.type.style.backgroundColor = "#47cf73"
            phone.errStatus = false
        }

        phone.checkError()
    }
}

class EmailContact extends Contacts {
    constructor(type = inp_email, reg = /^\w+\.+\w+@+mail+\.+ru$|^\w+\-+\w+@+mail+\.+ru$|^\w+@+mail+\.+ru$/g) {
        super(type, reg)
        this.error = 'Поле E-MAIL не заполнено или заполнено некорректно. E-mail должен иметь вид mymail@mail.ru, my.mail@mail.ru или my-mail@mail.ru<br>'
    }

    init() {
        email.inp_inf = email.type.value
        let arr = email.type.value.match(email.reg)
        if (arr == null) {
            email.type.style.backgroundColor = "#FA8072"
            email.errStatus = true
        } else {
            email.type.style.backgroundColor = "#47cf73"
            email.errStatus = false
        }
        email.checkError()
    }
}

class TextContact extends Contacts {
    constructor(type = inp_text, reg = null) {
        super(type, reg)
        this.error = 'Поле СООБЩЕНИЕ не заполнено'
    }

    init(evt) {
        text.inp_inf = text.type.value
        if (text.inp_inf == '') {
            text.type.style.backgroundColor = "#FA8072"
            text.errStatus = true
        } else {
            text.type.style.backgroundColor = "#47cf73"
            text.errStatus = false
        }
        text.checkError()
    }
}


let namec = new NameContact
let phone = new PhoneContact
let email = new EmailContact
let text = new TextContact

document.querySelector('.btn-contact').addEventListener('click', namec.init)
document.querySelector('.btn-contact').addEventListener('click', phone.init)
document.querySelector('.btn-contact').addEventListener('click', email.init)
document.querySelector('.btn-contact').addEventListener('click', text.init)