// Для замены кавычек
class Replacer {
    constructor(blockText) {
        this.block = blockText
        this.pattern = new RegExp ('( \')(.+)(\')', 'gi')
        this.elementsForReplace = ' "$2"'
        this.replacedText = this.replaceText ()
        this.resultContainer = document.getElementById ('result')
    }

    replaceText () {
        return  document.getElementById (this.block)
        .innerHTML
        .replace (this.pattern, this.elementsForReplace)
    }
    
    renderReplacedElements () {
        this.resultContainer.innerHTML = ''
        this.resultContainer.insertAdjacentHTML ('beforeend', this.replacedText)
    }
}

// Правила валидации 
const rules = {
    // Поле: name аттрибут
    Name: 'name',
    Textarea: 'textarea',
    Email: 'email',
    Phone: 'phone'
}

// Объект для валидации!
class Validator {
    constructor () {
        // Наши поля которые нужно валидировать
        this.fields = (new Fields ('form')).fields
        // Для записи результата валидации
        this.resultContainer = document.getElementById ('validation-result')    
    }
    // Валидация всей формы
    validateForm () {
        this.resultContainer.innerHTML = ''
        this.fields.forEach (field => {
            let errorId = field.name + '-error'
            // Валидируем и проверяем была ли уже выведена ошибка в поле, если нет то выводим ошибку
            if (!field.validate ()) {
                if (!document.getElementById (errorId)) {
                    let error = document.createElement ('span')
                    error.id = errorId
                    field.selector.parentNode.insertBefore (this.renderError (field, error), field.selector)
                } 
            } else {
                // Если есть ошибка а поле провалидировано то убираем ошибку
                let error = document.getElementById (errorId)
                error ? error.remove () : null                
                this.resultContainer.innerHTML += `Поле ${field.name} провалидировано<br>`
            }
        })
    }
    // Выводим сообщение об ошибке для каждого элемента
    renderError (field, error) {
        error.innerText = field.errorMessage
        return error 
    }
}

// Родительский класс для полей формы 
class Element {
    constructor (name) {
        // id поля формы. Уже нет времени переделывать, когда переделывал то все сломалось
        this.name = name
        this.selector = this.getSelector ()
        this.errorMessage = this.getErrorMessage ()
        this.rule = new Rule (rules[this.constructor.name])
    }
    getSelector () {
        return document.getElementById (this.name)
    }
    getValue () {
        return this.selector.value 
    }
    validate () {
        return this.getValue ().match (this.rule.ruleRegExp ()) ? true : false
    }
    // Стандартное сообщение об ошибке которое потом мы переопределим!
    getErrorMessage () {
        return `Ошибка поля ${this.name}`
    }
}

// Это поля 
// Мы наследуемся от Element и просто переопредиляем getErrorMessage ()
class Name extends Element {
    getErrorMessage () {
        return `Вводите только латиницу и кириллицу!`
    }
}

class Phone extends Element {
    getErrorMessage () {
        return `Телефон должен быть формата +7(000)000-0000. Скобочки и тире не обязательно!` 
    }
}

class Email extends Element {
    getErrorMessage () {
        return `Email должен быть формата "mail123@mail.com". Также перед @ можно использовать - _ .`
    }
}   

class Textarea extends Element {
    getErrorMessage () {
        return `Здесь можно использовать буквы цифры и -.`
    }
}

// Здесь мы берем id поля и для него возвращаем правило валидации
class Rule {
    constructor (ruleName) {
        this.rule = ruleName
    }
    ruleRegExp () {
        switch (this.rule) {
            case 'name':
                return new RegExp ('^[a-zа-я]+$', 'i')
            case 'phone':
                return new RegExp ('(\\+7)\\(?([0-9]{3})\\)?([0-9]{3})\\-?([0-9]{4})$')
            case 'email':
                return new RegExp ('([a-z0-9]+)(\\.|\\-|\\_[a-z]+)?@([a-z]+)\\.([a-z]+)$')
            case 'textarea':
                return new RegExp ('^[a-zа-я0-9 \\-\\.]+$', 'i') 
        }
    }
}

// formFields и объект Fields для того чтобы достать поля из формы которые нужно провалидилровать 
const formFields = {
    name: Name,
    textarea: Textarea,
    phone: Phone,
    email: Email
}

class Fields {
    constructor (form) {
        this.form = form
        this.fields = []
        this.getFields ()
    }
    getFields () {
        document.querySelector (this.form)
        .childNodes
        .forEach (element => {
            if (element.id) {
                for (let rule in rules) {
                    rules[rule] == element.id ? this.fields.push (new formFields[element.id] (element.id)) : null  
                }
            }
        })
    }
}

let replacer = new Replacer ('text')
let validator = new Validator ()

document.getElementById ('show-result').addEventListener ('click', () => replacer.renderReplacedElements ())
document.getElementById ('validate-form').addEventListener ('click', () => validator.validateForm ())