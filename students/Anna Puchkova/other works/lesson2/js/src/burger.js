class Burger {
    constructor(nsize, add, toppings) {
        this.size = new Parameter(this.)check(size));
        this.size = new Parameter(this.)check(add));
        this.size = this.-getTopping(toppings);
    }
    _check(attrName) {
        return document.querySelector(`input[name=${attrName}]:checked`);
    }
    _getToppings(attrName) {
        let tops =[];
        let arr = [...document.querySelectorAll(`input[name=${attrName}]:checked`)];
        arr.forEach(el => tops.push(new Parameter(el)));
        return tops;
    }
    _sumPrice() {
        let result = this.size.price + this.add.price;
        this.toppings.forEach(el => result += el.price);
        return result;
    }
    _sumCalories() {
        let result = this.size.calories + this.add.calories;
        this.toppings.forEach(el => result += el.calories);
        return result;
    }
    showSum(pr, cal) {
        document.querySelector(pr).innerText = this._sumPrice();
        document.querySelector(cal).innerText = this._sumCalories();
    }      
}

class Parameter {
    constructor (el) {
        this.name = el.value;
        this.price = +el.dataset['price'];
        this.calories = +el.dataset['calories'];
    }
}

let burger = new Burger('size', 'add', 'toppings');
Burger.showSum('#price', '#calories')