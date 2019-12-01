'use strict'
window.onload = () => {
    document.getElementById('calculate').addEventListener('click', () => {
        let burger = new Hamburger('size', 'stuffing', 'extra');
        console.log(burger);
        burger.showSum('#price', '#calories');
    })
};

class Param {
    constructor(element) {
        this.name = element.value;
        this.price = +element.dataset.price;
        this.calories = +element.dataset.calories;
    }
}

class Hamburger {
    constructor(size, stuffing, toppings) {
        this.size = new Param(this._select(size));
        this.stuffing = new Param(this._select(stuffing));
        this.toppings = this._getToppings(toppings);
    }

    _getToppings(name) {
        let result = [];
        this._selectAll(name).forEach(el => {
            result.push(new Param(el))
        });
        return result;
    }

    _selectAll(name) {
        return [...document.querySelectorAll(`input[name="${name}"]:checked`)];
    }

    _select(name) {
        return document.querySelector(`input[name="${name}"]:checked`);
    }

    countPrice() {
        let totalPrice = this.size.price + this.stuffing.price;
        this.toppings.forEach(el => {
            totalPrice += el.price;
        });
        return totalPrice;
    }

    countCalories() {
        let totalCalories = this.size.calories + this.stuffing.calories;
        this.toppings.forEach(el => {
            totalCalories += el.calories;
        });
        return totalCalories;
    }

    showSum(price, calories) {
        document.querySelector(price).innerText = this.countPrice();
        document.querySelector(calories).innerText = this.countCalories();
    }
}