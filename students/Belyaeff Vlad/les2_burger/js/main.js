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
    for (let el of this.filling) {
      price += el.price;
    }
    for (let el of this.addition) {
      price += el.price;
    }
    return price;
  }
  getCol() {
      let col = this.size.col
      for (let el of this.filling) {
        col += el.col;
      }
      for (let el of this.addition) {
        col += el.col;
      }
      return col;
    }
    //проверка на налачие выбранного размера
  checkSize() {
      if (this.size.price == undefined) {
        return true;
      }
    }
    //проверка на наличие выбранного наполнения
  checkFilling() {
    if (this.filling.length === 0) {
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
  for (let el of size.children) {
    if (el.firstChild.checked) {
      let id = +el.firstChild.defaultValue;
      for (let em of sizes) {
        if (id === em.id) {
          burger.setSize(returnParams(em));
        }
      }
    }
  }

  //проверка на заполненность зармера бургера
  if (burger.checkSize()) {
    alert("Вы не выбрали размер бургера!");
    return
  }

  //поиск по id в массиве наполнителей
  for (let el of filling.children) {
    if (el.firstChild.checked) {
      let id = +el.firstChild.defaultValue;
      for (let em of fillings) {
        if (id === em.id) {
          burger.setFilling(returnParams(em));
        }
      }
    }
  }

  //проверка на запоненность наполнения бургера
  if (burger.checkFilling()) {
    alert("Вы не выбрали наполнение бургера!");
    return
  }

  //поиск по id в массиве дополнений
  for (let el of addition.children) {
    if (el.firstChild.checked) {
      let id = +el.firstChild.defaultValue;
      for (let em of additions) {
        if (id === em.id) {
          burger.setAddition(returnParams(em));
        }
      }
    }
  }

  //вывод результата
  result.innerHTML = `
  <p>Итоговая стоимость: ${burger.getPrice()} ${currency}</p>
  <p>Итоговая каллорийность: ${burger.getCol()}</p>
  `;
});

//Объявляем функцию инициализации (не делал сразу через вёрстку HTML т.к. хочется сделать так, чтобы если в бэке добавили что-то, то автоматически страница бы рендерилась правильно)
function initEntity(arr, position, type) {
  for (let el of arr) {
    let newAdd = document.createElement("input");
    let newP = document.createElement("p");
    let newSpan = document.createElement("span");
    newAdd.type = type;
    newAdd.name = position.className;
    newAdd.value = el.id;
    newSpan.innerHTML = addDescription(el.name, el.price, currency, "+", el.col);
    newP.appendChild(newAdd);
    newP.appendChild(newSpan);
    position.appendChild(newP);
  }
}

//Добавление описания с ценой и калорийностью
function addDescription(name, price, currency, symbol, col) {
  return `  ${name}<p class="description">Цена: ${symbol}${price} ${currency}</p><p class="description">Калорийность: ${col}</p>`;
}

function returnParams(item) {
  let params = new Params;
  params.setParams(item.name, item.price, item.col);
  return params
}

//функция инициализации формы
function init() {
  initEntity(sizes, size, "radio");
  initEntity(fillings, filling, "checkbox");
  initEntity(additions, addition, "checkbox");
  result.innerHTML = "Тут будет результат расчёта";
}

//начало работы
init(); 