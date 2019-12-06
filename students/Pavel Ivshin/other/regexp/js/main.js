//1, 2
let text = "Lorem, 'ipsum' dolor sit amet consectetur adipisicing eli't. 'Accusamus distinctio ea aperiam' possimus, laboriosam quaerat non ab repellat. Qui's eaque ex laborum aut, sunt quidem repellendus 'explicabo' nisi rem officiis magni molestiae officia quaerat nemo. Ipsam, officii's facilis!"

class ReplacerQuote {
    constructor(regexp, replString){
        this.regexp = regexp
        this.replString = replString //на что заменяю
    }

    replace(text){
        return text.replace(this.regexp, str => (str == "\' ")? (this.replString + " ") : (" " + this.replString))
    }
}

console.log(text)
let repl = new ReplacerQuote(/'\s|\s'/gi, "\"")
let newText = repl.replace(text)
console.log(newText)

//3
class FormValidator {
    constructor(formNode, fields){
        this.formNode = formNode
        this.fields = fields
        this._init()
    }

    _init(){
        this.formNode.addEventListener('submit',this.validateForm.bind(this))
    }

    validateForm(event){
        event.preventDefault();
        let valid = true
        this.fields.forEach(field => {
            if(field.regexp.test(field.node.value)){
                field.node.style.backgroundColor = "white"
            }
            else{
                field.node.style.backgroundColor = "red"
                valid = false
            }
        })
        return valid
    }
}

let fildesData = [
    {"node": document.querySelector('.name'), "regexp": /[a-zA-Zа-яА-Я]/},
    {"node": document.querySelector('.tel'), "regexp": /^\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{4}$/},
    {"node": document.querySelector('.email'), "regexp": /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+\.[a-z]{2,6}$/}
]

let formValidator = new FormValidator(document.querySelector('.form'), fildesData)