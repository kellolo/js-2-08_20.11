function createEl (el) {
    let p = document.createElement('p');
    let e = document.createElement('input');
    e.setAttribute('type', el.type);
    e.dataset['id'] = el.id;
    e.name = el.name;
    e.dataset['price'] = el.price;
    e.dataset['energy'] = el.energy;
    p.appendChild(e);
    p.appendChild(document.createTextNode(' ' + el.text + ' ' + '(+' + el.price + ' рублей, ' + '+' + el.energy + ' калорий)'));
    return p;
} 

class Hamburger {
    size = -1;
    entry = -1;
    addon = [];
    sumPrice = -1;
    sumEnergy = -1;

    constructor(menu) {     
        this.menu = menu
        this.getToppings();
    }

    getToppings() {   // Получить список добавок 
        let block = document.querySelector('.product-item');
        block.appendChild(document.createTextNode('Выберите размер!'));
        block.appendChild(createEl(this.menu[0]));
        block.appendChild(createEl(this.menu[1]));
        block.innerHTML += '<hr>'
        block.appendChild(document.createTextNode('Выберите начинку!'));
        block.appendChild(createEl(this.menu[2]));
        block.appendChild(createEl(this.menu[3]));
        block.appendChild(createEl(this.menu[4]));
        block.innerHTML += '<hr>'
        block.appendChild(document.createTextNode('Выберите добавку!'));
        block.appendChild(createEl(this.menu[5]));
        block.appendChild(createEl(this.menu[6]));
        block.addEventListener('change', (evt) => { this.changeHamburger(evt) })
        let el = block.innerHTML += '<div class="order"></div>'
    }

    changeHamburger(evt) {       
        switch (evt.target.name) {
            case 'size':              
                this.getSize(evt.target.dataset['id']);
                break;
            case 'entry':               
                this.getStuffing(evt.target.dataset['id']);
                break;
            case 'addon':                
                if (evt.target.checked)
                    this.addTopping(evt.target.dataset['id']);
                else
                    this.removeTopping(evt.target.dataset['id']);
                break;
        }
        //evt.target
        this.setOrder();
    }

    addTopping(id) {    // Добавить добавку        
        if (this.addon.indexOf(id) == -1)
            this.addon.push(id)
    }

    removeTopping(id) { // Убрать добавку        
        if (this.addon.indexOf(id) != -1)
            this.addon.splice(this.addon.indexOf(id), 1);
    }

    getSize(id) {              // Узнать размер гамбургера 
        this.size = id
    }

    getStuffing(id) {          // Узнать начинку гамбургера 
        this.entry = id
    }

    calculatePrice() {       // Узнать цену         
        this.sumPrice = 0;
        this.addon.forEach(id => { 
            this.sumPrice += this.menu[id].price;  
        } )
        if (this.size != -1)
            this.sumPrice += this.menu[this.size].price;
        if (this.entry != -1)
            this.sumPrice += this.menu[this.entry].price;
    }

    calculateCalories() {    // Узнать калорийность        
        this.sumEnergy = 0;
        this.addon.forEach(id => { 
            this.sumEnergy += this.menu[id].energy;  
        } )
        if (this.size != -1)
            this.sumEnergy += this.menu[this.size].energy;
        if (this.entry != -1)
            this.sumEnergy += this.menu[this.entry].energy;
    }

    setOrder() {
        document.querySelector('.order').innerHTML = '';
        this.calculateCalories();
        this.calculatePrice();       
        let addons = '';
        this.addon.forEach( id => {
            addons += ', ';
            addons += this.menu[id].text;
        } )
        if (this.size != -1 && this.entry != -1)
            document.querySelector('.order').appendChild(document.createTextNode(this.menu[this.size].text + ' бургер ' + this.menu[this.entry].text + '' + addons + ' (' + 'цена ' + this.sumPrice + ' рублей, ' + this.sumEnergy + ' калорий)'));
    }
}

let menu = JSON.parse(
    '[{"type":"radio","id":0,"name":"size","text":"Маленький","price":50,"energy":20},' +
    '{"type":"radio","id":1,"name":"size","text":"Большой","price":100,"energy":40},' +
    '{"type":"radio","id":2,"name":"entry","text":"с сыром","price":10,"energy":20},'+
    '{"type":"radio","id":3,"name":"entry","text":"с салатом","price":20,"energy":5},'+
    '{"type":"radio","id":4,"name":"entry","text":"с картофелем","price":15,"energy":10},'+
    '{"type":"checkbox","id":5,"name":"addon","text":"посыпать приправой","price":15,"energy":0},'+
    '{"type":"checkbox","id":6,"name":"addon","text":"полить майонезом","price":20,"energy":5}]');


let Hamb = new Hamburger (menu);

  /*
  * Некая сеть фастфуда предлагает несколько видов гамбургеров:
.
.
Гамбургер может быть с одним из нескольких видов начинок (обязательно):
.
.
.
Дополнительно гамбургер можно  и . 
Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса со следующей страницы, но можно использовать и свою.

  
  */