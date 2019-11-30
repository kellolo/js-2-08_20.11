'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uForm = document.querySelector('#userform');
var btn = document.querySelector('#buy');
var result = document.querySelector('#result');
var myDinner = []; // for testing

var createHumburger = function createHumburger() {
  var newHumburger = new Hamburger('Size', 'Stuffing', 'Topping');
  myDinner.push(newHumburger); // for testing
  result.innerHTML = newHumburger.View;
};

var Hamburger = function () {
  function Hamburger(size, stuffing, toppings) {
    _classCallCheck(this, Hamburger);

    this.Size = this.getSize(size);
    this.Stuffing = this.getStuffing(stuffing);
    this.Toppings = this.getToppings(toppings);
    this.Price = this.calculatePrice(size, stuffing, toppings);
    this.Calories = this.calculateCalories(size, stuffing, toppings);
    this.initToppingElems(toppings);
    this.View = this.displayDinner();
  }

  _createClass(Hamburger, [{
    key: 'displayDinner',
    value: function displayDinner() {
      return 'Your selected: ' + this.Size + ' hamburger with \n      ' + this.Stuffing + '. \n      </br>Your toppings:  ' + (this.Toppings.length == 0 ? 'no' : this.Toppings) + '. \n      </br>Your price is: ' + this.Price + ' $.\n      </br>And please note: You get ' + this.Calories + ' calories.';
    }
  }, {
    key: 'initToppingElems',
    value: function initToppingElems(attr) {
      var _this = this;

      var arr = [].concat(_toConsumableArray(document.querySelectorAll('input[name=' + attr + ']')));
      arr.forEach(function (elem) {
        return elem.addEventListener('change', function (event) {
          var x = _this.getToppings(attr);
        });
      });
      this.displayDinner();
    }
  }, {
    key: 'addTopping',
    value: function addTopping(attr) {// Добавить добавку 
    }
  }, {
    key: 'removeTopping',
    value: function removeTopping(attr) {// Убрать добавку 


    }
  }, {
    key: 'getToppings',
    value: function getToppings(attr) {
      // Получить список добавок 
      var topps = [];
      var arr = [].concat(_toConsumableArray(document.querySelectorAll('input[name=' + attr + ']:checked')));
      arr.forEach(function (element) {
        return topps.push(element.value);
      });
      return topps;
    }
  }, {
    key: 'getSize',
    value: function getSize(attr) {
      // Узнать размер гамбургера 
      var obj = document.querySelector('input[name=' + attr + ']:checked');
      return obj ? obj.value : 'no';
    }
  }, {
    key: 'getStuffing',
    value: function getStuffing(attr) {
      // Узнать начинку гамбургера 
      var obj = document.querySelector('input[name=' + attr + ']:checked');
      return obj ? obj.value : 'no';
    }
  }, {
    key: 'calculatePrice',
    value: function calculatePrice(attr1, attr2, attr3) {
      // Узнать цену 
      var sum1 = void 0,
          sum2 = void 0;
      var sum3 = 0;

      sum1 = this.getSize(attr1) == 'no' ? 0 : this.getSize(attr1) == 'small' ? 50 : 100;
      sum2 = this.getStuffing(attr2) == 'no' ? 0 : this.getStuffing(attr2) == 'cheese' ? 10 : this.getStuffing(attr2) == 'salad' ? 20 : 15;
      this.getToppings(attr3).forEach(function (elem) {
        sum3 = elem == "spice" ? sum3 + 15 : sum3 + 20;
      });

      return sum1 + sum2 + sum3;
    }
  }, {
    key: 'calculateCalories',
    value: function calculateCalories(attr1, attr2, attr3) {
      // Узнать калорийность 
      var sum1 = this.getSize(attr1) == 'small' ? 20 : 40;
      var sum2 = this.getStuffing(attr2) == 'cheese' ? 20 : this.getStuffing(attr2) == 'salad' ? 5 : 10;
      var sum3 = 0;
      this.getToppings(attr3).forEach(function (elem) {
        sum3 = elem == "spice" ? sum3 : sum3 + 5;
      });
      return sum1 + sum2 + sum3;
    }
  }]);

  return Hamburger;
}();

btn.addEventListener('click', createHumburger);