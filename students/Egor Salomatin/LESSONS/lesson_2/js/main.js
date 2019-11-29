document.querySelector("#btn").addEventListener("click", function () {
    
    if (document.querySelectorAll(`input[name="fill"]:checked`).length === 0) {

        document.querySelector(".fill").classList.add("red-border");
        document.querySelector(".result").innerText = "Выберите хотя бы одну начинку!";

    } else {

        document.querySelector(".fill").classList.remove("red-border");
        let burger = new Burger("size", "fill", "add");

    }
})

class Burger {
    constructor (size, fill, add) {
        this.price = 0;
        this.cal = 0;
        this._getRadio(size);
        this._getChecked(fill);
        this._getChecked(add);
        this._render();
    }

    _getRadio(name) {
        let node = document.querySelector(`input[name="${name}"]:checked`);
        this.price += +node.dataset.price;
        this.cal += +node.dataset.cal;
    }

    _getChecked(name) {
        let nodes = document.querySelectorAll(`input[name="${name}"]:checked`);
        [...nodes].forEach((elem) => {
            this.price += +elem.dataset.price;
            this.cal += +elem.dataset.cal;
        })
    }

    _render() {
        let textBlock = document.querySelector(".result");
        textBlock.innerText = `Стоимость вашего бургера - ${this.price} р. Калорийность ${this.cal} - кал.`
    }
}