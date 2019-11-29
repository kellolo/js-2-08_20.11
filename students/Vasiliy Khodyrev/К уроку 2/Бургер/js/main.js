window.onload = () => {

    document.getElementById('calc').addEventListener('click', function () {
    
        if (document.querySelectorAll(`input[name="stuff"]:checked`).length === 0) {
            document.querySelector('.stuff').classList.add('redBorder');
            document.querySelector('.result').innerText = 'В смысле?! Просто булка? А где начинка?!'
        } else {
            document.querySelector('.stuff').classList.remove('redBorder');
            let burger = new Burger('size', 'stuff', 'add');
        }
    })
}

class Burger {
    constructor (size, stuff, add) {
        this.price = 0;
        this.calories = 0;
        this._getSizeBurger(size);
        this._getStuffings(stuff);
        this._getStuffings(add);
        this._render();
    }

    _getSizeBurger(name) {
        let size = document.querySelector(`input[name='${name}']:checked`);
        this.price += +size.dataset.price;
        this.calories += +size.dataset.calories;
    }

    _getStuffings(name) {
        let options = document.querySelectorAll(`input[name='${name}']:checked`);
        [...options].forEach((el) => {
            this.price += +el.dataset.price;
            this.calories += +el.dataset.calories;
        })
    }

    _render() {
        let message = '';
        let resultBlock = document.querySelector('.result');
        if (this.calories === 80) {
            message = 'А ты не лопнешь, обжора?!'
        }
        resultBlock.innerHTML = `${message} </br></br> Стоимость вашего бургера - ${this.price} рублей </br> Калорийность ${this.calories} - калорий`
    }
}