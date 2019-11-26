'use strict';

const uForm = document.querySelector ('#maker');
const btn = document.querySelector ('#go');
const elPrice = document.querySelector ('.totalPrice');
const elCalories = document.querySelector ('.totalCalories');
const checkAuto = document.querySelector ('#auto');

btn.addEventListener ('click', () => {
    myBurger.displayInfo (elPrice, elCalories);
});

checkAuto.addEventListener ('click', autoCalculateToggle);

function displayInfo () {
    myBurger.displayInfo (elPrice, elCalories);
}

/**
 * Функция включает/выключает опцию автоподсчёта
 */
function autoCalculateToggle () {
    if (checkAuto.checked) {
        btn.classList.add('hide');
        uForm.addEventListener ('click', displayInfo);
        displayInfo ();
    } else {
        btn.classList.remove('hide');
        uForm.removeEventListener ('click', displayInfo);
    }
}

class Burger {
    constructor (size, stuffing, topping) {
        this.nameSize = size;
        this.nameStuffing = stuffing;
        this.nameTopping = topping;
    }
    
    // Получить список добавок
    getToppings (topping) {
        const arrTops = [...uForm.querySelectorAll (`input[name=${topping}]:checked`)];
        return arrTops;
    }

    // Узнать размер гамбургера
    getSize (attrName) {
        const object = uForm.querySelector (`input[name=${attrName}]:checked`);
        return object;
    }

    // Узнать начинку гамбургера
    getStuffing (attrName) {
        const object = uForm.querySelector (`input[name=${attrName}]:checked`);
        return object;
    }

    // Узнать цену
    calculatePrice () {
        let totalPrice = +this.size.dataset.price + +this.stuffing.dataset.price;
        this.toppings.forEach (el => {
            totalPrice += +el.dataset.price;
        });
        return totalPrice;
    }

    // Узнать калорийность
    calculateCalories () {
        let totalNrg = +this.size.dataset.nrg + +this.stuffing.dataset.nrg;
        this.toppings.forEach (el => {
            totalNrg += +el.dataset.nrg;
        });
        return totalNrg;
    }

    displayInfo (blockPrice, blockCalories) {
        this.size = this.getSize (this.nameSize);
        this.stuffing = this.getStuffing (this.nameStuffing);
        this.toppings = this.getToppings (this.nameTopping);
        this.totalPrice = this.calculatePrice ();
        this.totalCalories = this.calculateCalories ();

        this.displayPrice (blockPrice);
        this.displayCalories (blockCalories);
    }

    displayPrice (block) {
        block.innerText = `Итоговая стоимость гамбургера: ${this.totalPrice} руб.`;
    }
    
    displayCalories (block) {
        block.innerText = `Содержание калорий: ${this.totalCalories}.`;
    }
}

const myBurger = new Burger ('size', 'stuff', 'extra');