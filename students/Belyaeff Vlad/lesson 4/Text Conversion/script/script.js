'use strict';

//Получаем элемент кнопки отправки.
let sendFormBtn = document.querySelector('.send-btn');

//Добавляем слушатель события на кнопку отправки.
sendFormBtn.addEventListener('click', function (event) {
	event.preventDefault();
	let fieldTextOriginal = event.target.parentNode.querySelector('.text-original');
	let fieldTextReplacement = event.target.parentNode.querySelector('.text-replacement');
	fieldTextReplacement.value = replaceText(fieldTextOriginal.value);
});

/** Функция меняет в переданной строке одинарные кавычки на двойные.
 * @param {String} text - строка для замены кавычек.
 * @returns {String} - строка с замененными кавычками.
 */
function replaceText (text) {
	//Сначала меняем все одинарные кавычки на двойные.
	const reg1 = /'/g;
	let textReplacement = text.replace(reg1, '"');
	//Возвращаем одинарную кавычку, если после нее идет строчная латинская буква.
	const reg2 = /"([a-z])/g;
	return textReplacement.replace(reg2, replacer);
}

/** Функция меняет в переданной подстроке двойные кавычки на одинарные.
 * @param {String} str - подстрока для замены кавычек, которая совпала с регулярным выражением
 * в функции, которая вызвала функцию replacer.
 * @param {String} p - подстрока, которая совпала с содержанием скобок в регулярном выражении в
 * функции, которая вызвала функцию replacer.
 * @returns {String} - строка с замененными кавычками.
 */
function replacer (str, p) {
	return "'" + p;
}