let form = document.querySelector('form');
let buttSubmit = document.querySelector('.button-submit');
buttSubmit.addEventListener('click', submit(event));

class​ Hamburger​ {
    constructor​ (size, stuffing, more) {
        this.price = 0
        this.calories = 0
        this._getSize()
        this._render()
    }
    _getSize() {// Узнать размер гамбургера
        let size = document.querySelector('input[name="size"]:checked');
        this.price += +size.dataset.price;
        this.cal += +size.dataset.calories;
    }
    getToppings (topping) {// Получить список добавок

    }

    getStuffing () {// Узнать начинку гамбургера

    }
    calculatePrice () {// Узнать цену

    }
    calculateCalories () {// Узнать калорийность

    }
    _render() {
        let priceLabel = document.getElementById("priceLabel");
        let caloriesLabel = document.getElementById("caloriesLabel");
        priceLabel.innerText = 'Итоговая стоимость: ${this.price}'
        caloriesLabel.innerText = 'Калории: ${this.price}'
    }
}

function submit(event) {
    let buter = new Hamburger (size, stuffing, more)
}

