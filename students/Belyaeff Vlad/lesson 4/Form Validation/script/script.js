'use strict';

//Получаем элемент кнопки отправки.
let sendFormBtn = document.querySelector('.send-btn');

//Добавляем слушатель события на кнопку отправки.
sendFormBtn.addEventListener('click', function (event) {
	event.preventDefault();
	formValidate(event.target.parentNode);
});

/** Функция проверяет валидность данных в форме по заданным правилам.
 * @param {Object} form - форма, в которой произошел клик по кнопке отправки.
 */
function formValidate (form) {
	const rulesForm = {
		name: /^[a-zа-яё]+$/i,
		email: /^[\w-\.]+@[\w-]+\.[a-z]+$/i,
		phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/
	}
	let errorsQuantity = 0;
	let inputs = form.querySelectorAll('.input');
	inputs.forEach(function (input) {
		if (!rulesForm[input.attributes.name.value].test(input.value)) {
			input.classList.add('invalid');
			input.parentNode.querySelector('.err-txt').style.visibility = 'visible';
			errorsQuantity++;
		} else {
			input.classList.remove('invalid');
			input.parentNode.querySelector('.err-txt').style.visibility = 'hidden';
		}
	});
	if (errorsQuantity === 0) {
		form.submit();
	}
}