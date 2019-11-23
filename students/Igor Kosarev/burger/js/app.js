'use strict';

//Типо берём данные из бэка
const sizes = [{ id: 1, name: 'Маленький', price: 50, col: 20 }, { id: 2, name: 'Большой', price: 100, col: 40 }];
const fillings = [{ id: 1, name: 'Сыр', price: 10, col: 20 }, { id: 2, name: 'Салат', price: 20, col: 5 }, { id: 3, name: 'Картофель', price: 15, col: 10 }];
const additions = [{ id: 1, name: 'Приправа', price: 15, col: 0 }, { id: 2, name: "Майонез", price: 20, col: 5 }];

//задаём валюту
const currency = " руб.";

//Объявляем класс параметров элементов бургера
class Params {
  constructor(name, price, col) {
    this.name = name;
    this.price = price;
    this.col = col;
  }
  setParams(name, price, col) {
    this.name = name;
    this.price = price;
    this.col = col;
  }
}

//Объявляем класс бургера
class Burger {
  constructor() {
      this.size = new Params;
      this.filling = new Array;
      this.addition = new Array;
    }
    //устанавливающие значения функции
  setSize(size) {
    this.size = size;
  }
  setFilling(filling) {
    this.filling.push(filling);
  }
  setAddition(addition) {
      this.addition.push(addition);
    }
    //возвращающие значения функции
  getPrice() {
    let price = this.size.price;
    for (let i = 0; i < this.filling.length; i++) {
      price += this.filling[i].price;
    }
    for (let i = 0; i < this.addition.length; i++) {
      price += this.addition[i].price;
    }
    return price;
  }
  getCol() {
      let col = this.size.col
      for (let i = 0; i < this.filling.length; i++) {
        col += this.filling[i].col;
      }
      for (let i = 0; i < this.addition.length; i++) {
        col += this.addition[i].col;
      }
      return col;
    }
    //проверка на налачие выбранного размера
  check() {
    if (this.size.price == undefined) {
      return true;
    }
  }
}

//Объявляем переменные DOM
let size = document.querySelector('.size');
let filling = document.querySelector('.filling');
let addition = document.querySelector('.addition');
let result = document.querySelector('.result');
let calcBtn = document.querySelector('.calculate');

//Добавляем слушателя на кнопку
calcBtn.addEventListener("click", () => {
  let burger = new Burger; //создаём новый бургер
  //поиск по id в массиве размеров 
  for (let i = 0; i < size.children.length; i++) {
    if (size.children[i].firstChild.checked) {
      let id = +size.children[i].firstChild.defaultValue;
      for (let j = 0; j < sizes.length; j++) {
        if (id === sizes[j].id) {
          let burgerSize = new Params;
          burgerSize.setParams(sizes[j].name, sizes[j].price, sizes[j].col);
          burger.setSize(burgerSize);
        }
      }
    }
  }
  if (burger.check()) {
    alert("Вы не выбрали размер бургера!");
    return
  }
  //поиск по id в массиве наполнителей
  for (let i = 0; i < filling.children.length; i++) {
    if (filling.children[i].firstChild.checked) {
      let id = +filling.children[i].firstChild.defaultValue;
      for (let j = 0; j < fillings.length; j++) {
        if (id === fillings[j].id) {
          let burgerFilling = new Params;
          burgerFilling.setParams(fillings[j].name, fillings[j].price, fillings[j].col);
          burger.setFilling(burgerFilling);
        }
      }
    }
  }
  //поиск по id в массиве дополнений
  for (let i = 0; i < addition.children.length; i++) {
    if (addition.children[i].firstChild.checked) {
      let id = +addition.children[i].firstChild.defaultValue;
      for (let j = 0; j < additions.length; j++) {
        if (id === additions[j].id) {
          let burgerAdditions = new Params;
          burgerAdditions.setParams(additions[j].name, additions[j].price, additions[j].col);
          burger.setAddition(burgerAdditions);
        }
      }
    }
  }
  result.innerHTML = `
  <p>Итоговая стоимость: ${burger.getPrice()} ${currency}</p>
  <p>Итоговая каллорийность: ${burger.getCol()}</p>
  `;
});

//Объявляем функцию инициализации (не делал сразу через вёрстку HTML т.к. хочется сделать так, чтобы если в бэке добавили что-то, то автоматически страница бы рендерилась правильно)
function initEntity(arr, position, type) {
  for (let i = 0; i < arr.length; i++) {
    let newAdd = document.createElement("input");
    let newP = document.createElement("p");
    let newSpan = document.createElement("span");
    newAdd.type = type;
    newAdd.name = position.className;
    newAdd.value = arr[i].id;
    newSpan.innerHTML = addDescription(arr[i].name, arr[i].price, currency, "+", arr[i].col);
    newP.appendChild(newAdd);
    newP.appendChild(newSpan);
    position.appendChild(newP);
  }
}

//Добавление описания с ценой и калорийностью
function addDescription(name, price, currency, symbol, col) {
  return `  ${name}<p class="description">Цена: ${symbol}${price} ${currency}</p><p class="description">Калорийность: ${col}</p>`;
}

//Основное тело программы
initEntity(sizes, size, "radio");
initEntity(fillings, filling, "checkbox");
initEntity(additions, addition, "checkbox");
result.innerHTML = "Тут будет результат расчёта";