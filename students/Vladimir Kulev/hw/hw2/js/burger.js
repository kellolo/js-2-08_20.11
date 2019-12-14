class Burger {
    constructor(size, filling, top1, top2) {
        this.burgerSize = this.getBurgerSize(size)
        this.burgerFilling = this.getBurgerFilling(filling)
        this.burgerTop = this.getBurgerTop(top1, top2)
    }

    getBurgerSize(size) {
        let big = 'большой'
        let little = 'маленький'
        let def = 'Необходимо сделать выбор'
        if (size == big) {
            return new Choice(big, 100, 40)
        } else if (size == little) {
            return new Choice(little, 50, 20)
        } else {
            return def
        }
    }

    getBurgerFilling(filling) {
        let chease = 'сыр'
        let salad = 'салат'
        let potato = 'картофель'
        let def = 'Необходимо сделать выбор'
        if (filling == chease) {
            return new Choice(chease, 10, 20)
        } else if (filling == salad) {
            return new Choice(salad, 20, 5)
        } else if (filling == potato) {
            return new Choice(potato, 15, 10)
        } else {
            return def
        }
    }

    getBurgerTop(top1, top2) {
        let arr = []
        let priprava = 'приправа'
        let mayonnaise = 'майонез'
        let def = 'Необходимо сделать выбор'
        if (top1 == priprava || top1 == mayonnaise) {
            arr.push(new Choice(top1, 15, 0))
        } else {
            return 'без топпинга'
        }
        if (top2 == priprava || top2 == mayonnaise) {
            arr.push(new Choice(top2, 20, 5))
        }

        return arr
    }
}

class Choice {
    constructor(name, price, cal) {
        this.name = name
        this.price = price
        this.cal = cal
    }
}

let f = function(evt) {
    let sizeB = document.querySelector(`input[name="rad_b"]:checked`)
    let fillB = document.querySelector(`input[name="rad_f"]:checked`)
    let topB = document.querySelectorAll(`input[name="check_f"]:checked`)
    if (evt.target.classList.contains('btn')) {
        if (sizeB == null) {
            document.querySelector('.output').innerHTML = 'Необходимо сделать выбор: Размер бургера'
            return 'Необходимо сделать выбор: Размер бургера'
        } else if (fillB == null) {
            document.querySelector('.output').innerHTML = 'Необходимо сделать выбор: Начинку бургера'
            return 'Необходимо сделать выбор: Начинку бургера'
        } else {
            if (topB[0] == null && topB[1] == null) {
                let obj = new Burger(sizeB.value, fillB.value)
                document.querySelector('.output').innerHTML =
                    `<p>Размер бургера: ${obj.burgerSize.name}</p>
            <p>(цена: ${obj.burgerSize.price}р, каллории: ${obj.burgerSize.cal})</p>
            <p>Начинка бургера: ${obj.burgerFilling.name}</p>
            <p>(цена: ${obj.burgerFilling.price}р, каллории: ${obj.burgerFilling.cal})</p>
            <h4>Общая цена: ${obj.burgerSize.price + obj.burgerFilling.price}</h4>
            <h4>Общее кол-во каллорий: ${obj.burgerSize.cal + obj.burgerFilling.cal}</h4>
            `
                return obj
            } else if (topB[0] == null && topB[1] != null) {
                let obj = new Burger(sizeB.value, fillB.value, topB[1].value)
                document.querySelector('.output').innerHTML =
                    `<p>Размер бургера: ${obj.burgerSize.name}</p>
            <p>(цена: ${obj.burgerSize.price}р, каллории: ${obj.burgerSize.cal})</p>
            <p>Начинка бургера: ${obj.burgerFilling.name}</p>
            <p>(цена: ${obj.burgerFilling.price}р, каллории: ${obj.burgerFilling.cal})</p>
            <p>Топпинг бургера: ${obj.burgerTop.name}</p>
            <p>(цена: ${obj.burgerTop[0].price}р, каллории: ${obj.burgerTop[0].cal})</p>
            <h4>Общая цена: ${obj.burgerSize.price + obj.burgerFilling.price + obj.burgerTop[0].price}</h4>
            <h4>Общее кол-во каллорий: ${obj.burgerSize.cal + obj.burgerFilling.cal + obj.burgerTop[0].cal}</h4>
            `
                return obj
            } else if (topB[0] != null && topB[1] == null) {
                let obj = new Burger(sizeB.value, fillB.value, topB[0].value)
                document.querySelector('.output').innerHTML =
                    `<p>Размер бургера: ${obj.burgerSize.name}</p>
            <p>(цена: ${obj.burgerSize.price}р, каллории: ${obj.burgerSize.cal})</p>
            <p>Начинка бургера: ${obj.burgerFilling.name}</p>
            <p>(цена: ${obj.burgerFilling.price}р, каллории: ${obj.burgerFilling.cal})</p>
            <p>Топпинг бургера: ${obj.burgerTop[0].name}</p>
            <p>(цена: ${obj.burgerTop[0].price}р, каллории: ${obj.burgerTop[0].cal})</p>
            <h4>Общая цена: ${obj.burgerSize.price + obj.burgerFilling.price + obj.burgerTop[0].price}</h4>
            <h4>Общее кол-во каллорий: ${obj.burgerSize.cal + obj.burgerFilling.cal + obj.burgerTop[0].cal}</h4>
            `
                return obj
            } else {
                let obj = new Burger(sizeB.value, fillB.value, topB[0].value, topB[1].value)
                document.querySelector('.output').innerHTML =
                    `<p>Размер бургера: ${obj.burgerSize.name}</p>
            <p>(цена: ${obj.burgerSize.price}р, каллории: ${obj.burgerSize.cal})</p>
            <p>Начинка бургера: ${obj.burgerFilling.name}</p>
            <p>(цена: ${obj.burgerFilling.price}р, каллории: ${obj.burgerFilling.cal})</p>
            <p>Топпинг бургера:</p>
            <p>${obj.burgerTop[0].name}</p>
            <p>(цена: ${obj.burgerTop[0].price}р, каллории: ${obj.burgerTop[0].cal})</p>
            <p>${obj.burgerTop[1].name}</p>
            <p>(цена: ${obj.burgerTop[1].price}р, каллории: ${obj.burgerTop[1].cal})</p>
            <h4>Общая цена: ${obj.burgerSize.price + obj.burgerFilling.price + obj.burgerTop[0].price + obj.burgerTop[1].price}</h4>
            <h4>Общее кол-во каллорий: ${obj.burgerSize.cal + obj.burgerFilling.cal + obj.burgerTop[0].cal + obj.burgerTop[1].price}</h4>
            `
                return obj
            }
        }
    }
}

document.querySelector('.btn').addEventListener('click', f)