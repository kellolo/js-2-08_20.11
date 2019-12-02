'use strict';

const names = ['small','big','cheese','salad','potato','spice','mayo'];
const costs = [50, 100, 10, 20, 15, 15, 20];
const energies = [20, 40, 20, 5, 10, 0, 5]; 

// массив вариантов/компонентов бургера
const menu = fetchData();

const uForm = document.querySelector ('#maker');
const btn = document.querySelector ('#go');
const elPrice = document.querySelector ('.totalPrice');
const elCalories = document.querySelector ('.totalCalories');
const checkAuto = document.querySelector ('#auto');

btn.addEventListener ('click', calculateTotal);
checkAuto.addEventListener ('click', autoCalculateToggle);

/**
 * Функция включает/выключает опцию автоподсчёта
 */
function autoCalculateToggle () {
    if (checkAuto.checked) {
        btn.classList.add('hide');
        uForm.addEventListener ('click', calculateTotal);
        calculateTotal();
    } else {
        btn.classList.remove('hide');
        uForm.removeEventListener ('click', calculateTotal);
    }
}

/**
 * Функция создаёт новый бургер, вызывает методы 
 * подсчёта его калорий и стоимости
 * и выводит полученные значения в форму
 */
function calculateTotal () {
    let newBurger = new Burger ('size', 'stuff', 'extra');
    elPrice.innerText = `Итоговая стоимость гамбургера: ${newBurger.calculatePrice()} руб.`;
    elCalories.innerText = `Содержание калорий: ${newBurger.calculateCalories()}.`;
}

/**
 * Класс Бургер)
 */
class Burger {
    constructor (size, stuffing, topping) {
        this.size = this.getSizeOrStuffing (size);
        this.stuffing = this.getSizeOrStuffing (stuffing);
        this.toppings = this.getToppings (topping);
    }

    // Узнать размер гамбургера или начинку гамбургера
    getSizeOrStuffing (attrName) {
        let object = uForm.querySelector (`input[name=${attrName}]:checked`);
        return menu.find (item => item.name == object.value);
    }

    // Получить список добавок
    getToppings (attrName) {
        let toppings = [];
        let arr = [...uForm.querySelectorAll (`input[name=${attrName}]:checked`)]
        arr.forEach (el => toppings.push ( menu.find (item => item.name == el.value)));
        return toppings;
    }

    // Рассчитать цену
    calculatePrice () {
        let sum = this.size.cost + this.stuffing.cost;
        this.toppings.forEach (el => sum += el.cost);
        return sum;
    }

    // Рассчитать калорийность
    calculateCalories () {
        let sum = this.size.energy + this.stuffing.energy;
        this.toppings.forEach (el => sum += el.energy);
        return sum;
    }
}

// Получение массива вариантов/компонентов бургера
function fetchData () {
    const arr = [];
    for (let i = 0; i < names.length; i++) {
        arr.push (createMenuItem (i));
    }
    return arr;
}

/**
 * Функция возвращает объект-вариант/компонент бургера
 * @param {number} i 
 */
function createMenuItem (i) {
    return {
        name: names [i],
        cost: costs [i],
        energy: energies [i],
    }
}