class Validation {
    constructor (target, re) {
        this.target = document.getElementById(target);
        this.name = this.target.name;
        this.re = re;       
    }
    output() {
        let valid = this.re.test(this.target.value);
        let text = (valid) ? `${this.name} is correct!` : `${this.name} is incorrect! Try again`;
        let place = document.getElementById(`${this.name}_output`);
        this.target.style.color = (valid) ? 'green' : 'red';
        this.target.style.backgroundColor = (valid) ? "lightgreen" : 'red';
        place.innerHTML = text;
    }
}

let reName = /^[a-zA-Zа-яА-ЯёЁ]+/;
let checkName = new Validation('name', reName);

let rePhone = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
let checkPhone = new Validation('phone', rePhone);

let reMail = /[a-zA-Z0-9.]*@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
let checkEmail = new Validation('email', reMail);

let reText = /./;
let checkText = new Validation('mes', reText);

const checkAll = () => {
    checkName.output();
    checkPhone.output();
    checkEmail.output();
    checkText.output();
};
/*
const ValidName = () => {
    let re = /^[a-zA-Zа-яА-ЯёЁ]+/;
    let target = document.getElementById('name');
    let myName = target.value;
    let result = document.getElementById('name_output');
    let valid = re.test(myName);
    if (valid) {
        output = 'Name is correct!';
        result.style.color = 'green';
        target.style.backgroundColor="lightgreen";
    } else {
        output = 'Name is incorrect! Try again';
        target.style.backgroundColor="red";
        result.style.color = 'red';
    }
    result.innerHTML = output;

    return valid;
}

const ValidMail = () => {
    let re = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    let target = document.getElementById('email');
    let myMail = target.value;
    let result = document.getElementById('email_output');
    let valid = re.test(myMail);
    if (valid) {
        output = 'Email is correct!';
        result.style.color = 'green';
        target.style.backgroundColor="lightgreen";
    } else {
        output = 'Email is incorrect! Try again!';
        target.style.backgroundColor="red";
        result.style.color = 'red';
    }
    result.innerHTML = output;
    
    return valid;
}
 
const ValidPhone = () => {
    let re = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
    let target = document.getElementById('phone');
    let myPhone = target.value;
    let result = document.getElementById('phone_output');
    let valid = re.test(myPhone);
    if (valid) {
        output = 'Phone is correct!';
        target.style.backgroundColor="lightgreen";
        result.style.color = 'green';
    } else {
        output = 'Phone is incorrect! Try again!';
        target.style.backgroundColor="red";
        result.style.color = 'red';
    }
    result.innerHTML = output;
    
    return valid;
}  

const ValidText = () => {
    let re = /[^\s]+/;
    let target = document.getElementById('mes');
    let myText = target.value;
    let result = document.getElementById('mes_output');
    let valid = re.test(myText);
    if (valid) {
        output = 'Text is correct!';
        target.style.backgroundColor="lightgreen";
        result.style.color = 'green';
    } else {
        output = 'Text is incorrect! Try again!';
        target.style.backgroundColor="red";
        result.style.color = 'red';
    }
    result.innerHTML = output;
    
    return valid;
}  */