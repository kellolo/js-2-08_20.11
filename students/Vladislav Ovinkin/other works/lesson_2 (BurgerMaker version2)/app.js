'use strict';

const uForm = document.querySelector ('#maker');
const btn = document.querySelector ('#go');
const elPrice = document.querySelector ('.totalPrice');
const elCalories = document.querySelector ('.totalCalories');
const checkAuto = document.querySelector ('#auto');

// ручная коробка
btn.addEventListener ('click', () => {
    myBurger.displayInfo ();
});

// коробка-автомат
checkAuto.addEventListener ('click', () => {
    if (checkAuto.checked) {
        btn.classList.add('hide');
        uForm.addEventListener ('click', () => {
            myBurger.displayInfo ();
        });
        myBurger.displayInfo (); // это если не посчитано в ручную (сразу посде запуска)
    } else {
        btn.classList.remove('hide');
        uForm.removeEventListener ('click', () => {
            myBurger.displayInfo ();
        });
    }
});
class Burger {
    constructor (param) {
        this.nameSize = param.size;
        this.nameStuffing = param.stuffing;
        this.nameTopping = param.topping;
        this.blockPrice = param.blockPrice;
        this.blockCalories = param.blockCalories;
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

    // посчитать данные и вызвать методы вывода на экран
    displayInfo () {
        this.size = this.getSize (this.nameSize);
        this.stuffing = this.getStuffing (this.nameStuffing);
        this.toppings = this.getToppings (this.nameTopping);
        this.totalPrice = this.calculatePrice ();
        this.totalCalories = this.calculateCalories ();

        this.displayPrice ();
        this.displayCalories ();
    }

    // показать стоимость
    displayPrice () {
        this.blockPrice.innerText = `Итоговая стоимость гамбургера: ${this.totalPrice} руб.`;
    }
    
    // показать количество калорий
    displayCalories () {
        this.blockCalories.innerText = `Содержание калорий: ${this.totalCalories}.`;
    }
}

const myBurger = new Burger   ({size: 'size',
                                stuffing: 'stuff', 
                                topping: 'extra',
                                blockPrice: elPrice,
                                blockCalories: elCalories});