let btn = document.querySelector('.order');

btn.addEventListener('click',addOrder)
function addOrder() {
    if (document.querySelector('input[name="filling"]:checked') != null) {
        let burger = new Burger('size', 'filling', 'add')
        burger.setParam('#price', '#calories')
    } else alert('Начинка обязательна должна быть выбрана!')
} 
class Ingredient {
    constructor (element) {
        this.name = element.value
        this.price = +element.dataset ['price']
        this.calories = +element.dataset ['calories']
    }
}
class Burger{
    constructor(size, filling, add){
        this.size = new Ingredient(this._getSize())
        this.filling = this._getIngr(filling)
        this.add = this._getIngr(add)
    }
    _getSize(){
        return document.querySelector('input[type="radio"]:checked')
    }
    _getIngr(attrName){
        let fill = []
        let arr = [...document.querySelectorAll(`input[name="${attrName}"]:checked`)]
        arr.forEach (el => fill.push(new Ingredient(el)))
        return fill
    }
    getPrice () {
        let sum = this.size.price
        this.filling.forEach (el => {
            sum += el.price
        })
        this.add.forEach (el => {
            sum += el.price
        })
        return sum
    }
    getCalories () {
        let sum = this.size.calories
        this.filling.forEach (el => {
            sum += el.calories
        })
        this.add.forEach (el => {
            sum += el.price
        })
        return sum
    }
    setParam (price, calories) {
        document.querySelector('.price').innerText = this.getPrice ()
        document.querySelector('.calories').innerText = this.getCalories ()
    }
}
