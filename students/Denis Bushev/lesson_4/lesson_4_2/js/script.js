// function validName(name) {
//     let regularName = /[A-Za-zA-Яа-яЁё]+(\s+[A-Za-zA-Яа-яЁё]+)?/i;
//     return regularName.test(name);
// }

// function validNumber(number) {
//     let regularNumber = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g;
//     return regularNumber.test(number);
// }

// function validEmail(email) {
//     let regularEmail = /^[\w-\.]+@[\w-]+\.[a-z]+$/i;
//     return regularEmail.test(email);
// }

// function validator() {
//     let name = document.getElementById('name');
//     let number = document.getElementById('number');
//     let email = document.getElementById('email');
//     if(validName(name.value)) {
//         name.style.backgroundColor = 'green';
//     } else {
//         name.style.backgroundColor = 'red';
//     }
//     if(validNumber(number.value)) {
//         number.style.backgroundColor = 'green';
//     } else {
//         number.style.backgroundColor = 'red';
//     }
//     if(validEmail(email.value)) {
//         email.style.backgroundColor = 'green';
//     } else {
//         email.style.backgroundColor = 'red';
//     }
// }

class Validator {
    constructor(name, regular) {
        this.name = document.getElementById(name);
        this.regular = regular;
    }
    output() {
        let valid = this.regular.test(this.name.value);
        if(!valid) {
            this.name.style.backgroundColor = 'red';
        } else {
            this.name.style.backgroundColor = 'green';
        }
    }
}

let regular = {
    name: /[A-Za-zA-Яа-яЁё]+(\s+[A-Za-zA-Яа-яЁё]+)?/i,
    number: /(?:\+|\d)[\d\-\(\) ]{9,}\d/g,
    email: /^[\w-\.]+@[\w-]+\.[a-z]+$/i
}

let name = new Validator('name', regular.name);
let number = new Validator('number', regular.number);
let email = new Validator('email', regular.email);

const checkAll = () => {
    name.output();
    number.output();
    email.output();
}