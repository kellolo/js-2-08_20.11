class Burger {
    constructor (size, add, topings) {
        this.size = new Parameter(this._check(size))
        this.add = new Parameter(this._check(add))
        this.topings = this._getToppings (topings)

    }
    _check (attrName) {
        return document.querySelector (`input[name=${attrName}]:checked`) 
    }
    _getToppings (attrName) {
        let arr = [...document.querySelectorAll (`input[name=${attrName}]:checked`)]
        let tops = []
        arr.forEach (el => tops.push (new Parameter (el)))
        return tops
    }
    _sumPrice () {
        let rez = this.size.price + this.add.price
        this.topings.forEach (el => {rez += el.price})
        return rez
    }
    _sumCalories () {
        let rez = this.size.calories + this.add.calories
        this.topings.forEach (el => {rez += el.calories})
        return rez
    }
    showSum (pr, cal) {
        document.querySelector (pr).innerText = this._sumPrice ()
        document.querySelector (cal).innerText = this._sumCalories ()
    }
}

class Parameter {
    constructor (el) {
        this.name = el.value
        this.price = +el.dataset['price']
        this.calories = +el.dataset['calories']
    }
    
}
