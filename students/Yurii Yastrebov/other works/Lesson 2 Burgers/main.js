class Hamburger {
    constructor(size, stuffing, topping) {
        this.size = new Parameter (this._check(size))
        this.stuffing = new Parameter (this._check(stuffing))
        this.topping = this._getToppings(topping)
    }
    _check(attrName) {
        return document.querySelector(`input[name=${attrName}]:checked`)
    }
    _getToppings(attrName) {
        let arr=[...document.querySelectorAll(`input[name=${attrName}]:checked`)]
        let tops = []
        arr.forEach (el => tops.push(new Parameter(el)))
        return tops
    }
    _calculatePrice () {
        let result = this.size.price + this.stuffing.price
        this.topping.forEach(el => {result += el.price})
        return result
    }
    _calculateCalories () {
        let result = this.size.calories + this.stuffing.calories
        this.topping.forEach(el => {result += el.calories})
        return result
    }
    calc (pr, cal) {
        document.querySelector(pr).innerText = this._calculatePrice()
        document.querySelector(cal).innerText = this._calculateCalories()
    }

}
class Parameter {
    constructor(el) {
        this.name = el.value
        this.price = +el.dataset.price
        this.calories = +el.dataset.calories
    }
}


