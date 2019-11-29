'use strict';

//Получаем элементы формы и кнопки заказа.
let form = document.querySelector('form');
let orderBtn = document.querySelector('.order-btn');

//Добавляем слущатель события на кнопку заказа.
orderBtn.addEventListener('click', calcOrder);

/** Функция считает заказ по введенным пользователем параметрам в форму.
 * @param {Object} event - произошедшее событие.
 */
function calcOrder(event) {
	if (chekFillingFields()) {
		let order = new Order('size', 'stuffing', 'topping');
		let stringOrder = `Заказ отправлен.\nКалорийность вашего гамбергера: ${order.calories} калорий.\nСтоимость вашего заказа: ${order.price} рублей.`;
		showOrder(stringOrder);
	} else {
		let stringError = 'Для заказа нужно выбрать размер и начинку гамбургера.';
		showOrder(stringError);
	};
	event.preventDefault();
	event.target.parentElement.reset();
}

/** Функция проверяет, выбраны ли размер и начинка для гамбургера в форме.
 * @return {Boolean}
 */
function chekFillingFields () {
	let sizeEl = document.querySelector(`input[name=size]:checked`);
	let stuffingEl = document.querySelector(`input[name=stuffing]:checked`);
	return (sizeEl && stuffingEl);
}

/** Функция выводит под формой строку с информацией о заказе или об ошибке.
 * @param {String} string - строка для вывода на странице..
 */
function showOrder (string) {
	let orderEl = document.querySelector('.order');
	orderEl.innerText = string;
}

//Класс заказа.
class Order {
	constructor (size, stuffing, topping) {
		this.size = this._check(size);
		this.stuffing = this._check(stuffing);
		this.topping = this._getTopping(topping);
		this.price = this._getPrice();
		this.calories = this._getCalories();
	}
	//Получение данных с элемента <input type="radio">.
	_check (name) {
		let objectEl = document.querySelector(`input[name=${name}]:checked`);
		return {
			name: objectEl.value,
			price: +objectEl.dataset.price,
			calories: +objectEl.dataset.calories
		};
	}
	//Получение данных с элемента <input type="checkbox">.
	_getTopping (name) {
		let tops = [];
		let toppingEl = [...document.querySelectorAll(`input[name=${name}]:checked`)];
		toppingEl.forEach(element => {
			let objectTop = {
				name: element.value,
				price: +element.dataset.price,
				calories: +element.dataset.calories
			};
			tops.push(objectTop);
		});
		return tops;
	}
	//Расчет стоимости заказа.
	_getPrice () {
		let size = this.size.price;
		let stuffing = this.stuffing.price;
		let topping = this._getToppingPrice(this.topping);
		return (size + stuffing + topping);
	}
	//Расчет суммарной стоимости добавок.
	_getToppingPrice (topping) {
		let price = 0;
		topping.forEach(function(element) {
			price += element.price;
		});
		return price;
	}
	//Расчет калорийности заказа.
	_getCalories () {
		let size = this.size.calories;
		let stuffing = this.stuffing.calories;
		let topping = this._getToppingCalories(this.topping);
		return (size + stuffing + topping);
	}
	//Расчет суммарной калорийности добавок.
	_getToppingCalories (topping) {
		let calories = 0;
		topping.forEach(function(element) {
			calories += element.calories;
		});
		return calories;
	}
}
