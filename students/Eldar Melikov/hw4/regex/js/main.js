
class regexReplacer {
    constructor () {
        this.text = `
        One: 'Hi Mary.' Two: 'Oh, hi.'
        One: 'How are you doing?'
        Two: 'I'm doing alright. How about you?'
        One: 'Not too bad. The weather is great isn't it?'
        Two: 'Yes. It's absolutely beautiful today.'
        One: 'I wish it was like this more frequently.'
        Two: 'Me too.'
        One: 'So where are you going now?'
        Two: 'I'm going to meet a friend of mine at the department store.'
        One: 'Going to do a little shopping?'
        Two: 'Yeah, I have to buy some presents for my parents.'
        One: 'What's the occasion?'
        Two: 'It's their anniversary.'
        One: 'That's great. Well, you better get going. You don't want to be late.'
        Two: 'I'll see you next time.'
        One: 'Sure. Bye.'`;
        this.regExp = `(?<=\\s)'|'(?=\\s)|'($)`;
        this.replText = '\"';
        this._init();    
    }
    _render() {
        return `<div>
                    <p>Введите регулярку для поиска</p>
                    <input id="regExp" type="text" size="40" value="${this.regExp}"></input>
                    <p>Введите текст для замены</p>
                    <input id="replText" type="text" size="40" value="${this.replText}"></input>
                    <p>Введите текст</p>
                    <textarea rows="20" cols="55" id="text" >${this.text}</textarea>
                    <p>
                    <button type="button" id="button" style="width: 110px; height: 25px">Выполнить</button>
                    </p>
                <div>`;
    }
    _init() {
        document.querySelector(".regBlock").addEventListener('input', (evnt) => {
            switch (evnt.target.id) {
                case "regExp": {
                    this.regExp = evnt.target.value;
                    break;
                }
                case "replText": {
                    this.replText = evnt.target.value;
                    break;
                }
                case "text": {
                    this.text = evnt.target.innerText.value;
                    break;
                }
            }
        });
        document.querySelector(".regBlock").innerHTML = this._render();

        document.querySelector("#button").addEventListener("click", () => {
            document.querySelector("#text").innerText = this.text.replace(new RegExp(this.regExp, "gmi"), this.replText);
        });
    }
}

let r = new regexReplacer();

class validpoint {
    constructor(_id, _regex){
        this.id = _id;
        this.regex = _regex;
    }
    render(){
        return `<p>Inter ${this.id}</p><input type="text" id="${this.id}" /><br>`;
    }
    validate(value){
        debugger;
        return value.match(new RegExp(this.regex, "gmi")) != null;
    }
}

class validator {
    constructor() {
        debugger;
        this.points = [
            new validpoint(`name`, `^[a-zA-Zа-яА-Я]*$`),
            new validpoint(`email`, `^[a-zA-Z\\.\\-]{2,}@[a-zA-Z]+\\.[a-zA-Z]{2,3}$`),
            new validpoint(`phone`, `^\\+7\\(\\d{3}\\)\\d{3}-\\d{4}$`),
        ];
        this._init();
    }
    _init() {
        debugger;
        let inner = "";
        this.points.forEach(function(p) {
            inner += p.render();
        });
        let block = document.querySelector(".validationBlock");
        block.innerHTML = inner;
        block.addEventListener("input", (evnt) => {
            debugger;
            let isValid = this.points.find(el => el.id == evnt.target.id).validate(evnt.target.value);
            if (!isValid) {
                document.querySelector("#" + evnt.target.id).classList.add("notValid");
            }
            else {
                document.querySelector("#" + evnt.target.id).classList.remove("notValid");
            }
        });
    }
}

let v = new validator();