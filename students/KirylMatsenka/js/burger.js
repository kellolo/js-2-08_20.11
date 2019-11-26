let form = document.getElementById('burger-form')
let buttonMakeOrder = document.getElementById('make-order')
let orders = []

// Здесь все по аналогии как у вас, по клику добавляем все в массив orders через makeOrder
buttonMakeOrder.addEventListener('click', makeOrder)

function makeOrder() {
    let customer = new Customer(document.getElementById('fat-boy').value)
    let count = new CountMoneyAndCalories(new Burger('burger','filling', 'extra'))
    orders.push (new Order (customer, count))
    customer.showOrder (orders)
}

// Объект заказчика который показывает выводит заказ в браузере 
class Customer {
    constructor(name) {
        this.name = name
    }

    showOrder (orders) {
        orders.forEach (order => this._renderOrder(order))        
    }

    _renderOrder (order) {
        let result =  `<p>Здравствуйте ${order.customer.name}!</p>
                        <p>Каллорий у вашего бургера ${order.count.totalCalories}</p>
                        <p>Стоимсть вашего бургера ${order.count.totalPrice}$</p>`
        
        if (order.count.totalCalories > 500) {
            result += `<p>${order.count.totalCalories} каллорий???!!! 
            Мне кажется вам нужно поменьше кушать а то разкабанеете! Или уже???</p>`
        }

        if (order.count.totalPrice > 150) {
            result += `<p>${order.count.totalPrice}$ за кусок мяса с булкой??? ну красиво жить не запретишь</p>`
        }

        document.getElementById ('result').innerHTML = result
    }
}



// Это у нас бургер со всеми начинками, все также как вы делали!
class Burger {
    constructor(burger, filling, extra) {
        this.burger = this._burger(burger)
        this.filling = this._forBurger(filling)
        this.extra = this._forBurger(extra)
    }

    _burger(attrName) {
        let burger = document.querySelector(`input[name=${attrName}]:checked`)
        return new BurgerData (burger.dataset['calories'], burger.dataset['price'])
    }

    _forBurger(attrName) {
        let fillers = []
        let fillersArray = document.querySelectorAll(`input[name=${attrName}]:checked`)
        fillersArray.forEach(
            filler => fillers.push (
                new BurgerData(filler.dataset['calories'], filler.dataset['price'])
            ))
        return fillers
    }
}


// Подсчитаем каллории и цену  
class CountMoneyAndCalories {
    constructor (burgerObject) {
        this.burgerObject = burgerObject
        this.totalCalories = this._getTotalCalories()
        this.totalPrice = this._getTotalPrice ()
    }

    _getTotalCalories () {
        let calories = parseInt (this.burgerObject.burger.calories)
        this.burgerObject.filling.forEach (filler => (calories += parseInt (filler.calories)))
        this.burgerObject.extra.forEach (filler => (calories += parseInt (filler.calories)))
        return calories
    }

    _getTotalPrice () {
        let price = parseInt (this.burgerObject.burger.price)
        this.burgerObject.filling.forEach (filler => (price += parseInt (filler.price)))
        this.burgerObject.extra.forEach (filler => (price += parseInt (filler.price)))
        return price
    }
}

// Помогает свойствам объекта Burger сформировать массив из каллорий и цен 
//начинок которые выбрал наш заказчик 
class BurgerData {
    constructor (calories, price) {
        this.calories = calories
        this.price = price
    }
}

// Объект для массива orders который содержит заказчика и и общую стоимость того чего он там назаказывал
class Order {
    constructor (customer, count) {
        this.customer = customer
        this.count = count
    }
}

// Рендерит цены и каллории
// Тут я просто не подумал о том что можно создать сразу объект с ценами и каллориями
// Поэтому я собираю цены после и рендерю их в label
class Helper {
    constructor () {
        this._renderPricesCalories ()
    }

    _renderPricesCalories () {
        let inputCollection = document.querySelectorAll ('input')
        inputCollection.forEach (input => this._getInputPriceCalorie(input))
    }

    _getInputPriceCalorie (input) {
        if (input.dataset['price']) {
            let label = document.querySelector(`label[for="${input.id}"]`)
            label.innerText += `: ${input.dataset['price']}$ каллорий ${input.dataset['calories']}`
        }
    }
}

let addPricesAndCallories = new Helper ()
