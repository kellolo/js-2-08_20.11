let patterns = {
    name: /^[a-zа-яё]+$/i,
    phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
    email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
    text: /./g,
    text2: /(?<=\s)'|'(?=\s)|^'|'$|'(?=[^A-Za-z0-9])|(?<=[^A-Za-z0-9])'/g
}
let errors = {
    name: 'Only letters',
    phone: 'The number must match the following pattern: +7(000)000-0000',
    email: 'E-mail is incorrect',
    text: 'Required Field'
}

let button = document.querySelector("button");

button.addEventListener("click", function (e) {
    e.preventDefault();
    let formValidator = new Validator("valid");
    if (formValidator.valid) {
        console.log("OK")
    }
})

class Validator {

    constructor(block, pat) {
        this.valid = false
        this.block = `.${block}`
        this._init()
        this.block = block
    }

    _init() {
        this.block = document.querySelectorAll(this.block);
        this.block.forEach((element, key) => {
            this.block[key].classList.remove("errors")
            let check = document.querySelector(`.err${this.block[key].name}`);
            if (check) {
                check.remove()
            }
        });

        for (let i = 0; i < this.block.length; i++) {
            this.valid = false
            if ((patterns[this.block[i].name]).test(this.block[i].value)) {
                this.block[i].classList.remove("errors")

            } else {
                this.block[i].classList.add("errors")
                this.addMessage(this.block[i])
            }
        }
    }
    checkFunk() {
        let check = document.querySelectorAll(".errors");
        if (check.length == 0) {
            console.log(this.block)
            let text = document.querySelector(".text").value
            console.log(text)
            if (text) {

                this.valid = true;
            }
        }
    }

    addMessage(el) {
        for (let key in errors) {
            if (key == el.name) {
                let message = errors[key]
                el.insertAdjacentHTML('beforebegin', `<p class="mes err${el.name}">${message}</p>`);
            }
        }
    }
}

let changeBtn = document.querySelector(".button");
changeBtn.addEventListener("click", function () {
    let text = document.querySelector(".test")
    let textChange = document.querySelector(".test").innerHTML;
    text.innerHTML = textChange.replace((patterns.text2), '"');
    text.style.color = "red";
    console.log(text)

})
//Все работает только в хроме