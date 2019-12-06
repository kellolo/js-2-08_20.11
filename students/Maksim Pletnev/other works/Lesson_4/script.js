let str = "Geek 'from' Geekbrains"
let regexp = /[']/g
document.querySelector(".part1s").textContent = str
document.querySelector(".part1d").textContent = str.replace(regexp, '"')
str = "We aren't die 'in' Geekbrains today. It's 'cool!!!'";
document.querySelector(".part2s").textContent = str
regexp = /\B'|'\B/g;
document.querySelector(".part2d").textContent = str.replace(regexp, '\"');
let phone;

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

function validatePhone(phone) {
    var re = /\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}/
    return re.test(phone);
}

function validateMe(el) {
    // email
    const email = document.getElementById("email")
    if (validateEmail(email.value)) {
        email.style = "border-color: green"
    } else {
        email.style = "border-color: red"
    }
    // phone
    const phone = document.getElementById("phone")
    if (validatePhone(phone.value)) {
        phone.style = "border-color: green"
    } else {
        phone.style = "border-color: red"
    }
}
window.onload = () => validateMe()