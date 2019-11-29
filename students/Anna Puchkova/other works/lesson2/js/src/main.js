
let uForm = document.querySelector('#userform');
let btn = document.querySelector('#buy');
let result = document.querySelector('#result');
let myDinner = []; // for testing

const createHumburger = () => {
  let newHumburger = new Hamburger('Size', 'Stuffing', 'Topping');
  myDinner.push(newHumburger); // for testing
 result.innerHTML = newHumburger.View;
};



class Hamburger {
    constructor(size, stuffing, toppings) { 
        this.Size = this.getSize(size);
        this.Stuffing = this.getStuffing(stuffing);
        this.Toppings = this.getToppings(toppings);
        this.Price = this.calculatePrice(size, stuffing, toppings);
        this.Calories = this.calculateCalories(size, stuffing, toppings);
        this.View = this.displayDinner();
     }
     displayDinner() {
      return `Your selected: ${this.Size} hamburger with 
      ${this.Stuffing}. 
      </br>Your toppings:  ${(this.Toppings.length == 0 ? 'no' : this.Toppings)}. 
      </br>Your price is: ${this.Price} $.
      </br>And please note: You get ${this.Calories} calories.`
     }

    getToppings(attr) {   // Получить список добавок 
      let topps = [];
      let arr = [...document.querySelectorAll(`input[name=${attr}]:checked`)];
      arr.forEach(element => topps.push(element.value));
      return topps;
    }
    getSize(attr) { // Узнать размер гамбургера 
      let obj = document.querySelector(`input[name=${attr}]:checked`);
      return obj ? obj.value : 'no';
    }
    getStuffing(attr) { // Узнать начинку гамбургера 
      let obj = document.querySelector(`input[name=${attr}]:checked`);
      return obj ? obj.value : 'no';
    }
    calculatePrice(attr1, attr2, attr3) {  // Узнать цену 
      let sum1, sum2;
      let sum3 = 0;     

      sum1 = (this.getSize(attr1) == 'no') ? 
      0 : (this.getSize(attr1) == 'small') ? 50 : 100;

      sum2 = (this.getStuffing(attr2) == 'no') ? 
              0 : (this.getStuffing(attr2) == 'cheese') ? 
              10 : (this.getStuffing(attr2) == 'salad') ? 20 : 15;
              
      this.getToppings(attr3).forEach(elem => {
        sum3 = (elem == "spice") ? sum3 + 15 : sum3 + 20;
      });

      return sum1 + sum2 + sum3;
    }
    calculateCalories(attr1, attr2, attr3) {    // Узнать калорийность 
      let sum1 = (this.getSize(attr1) == 'small') ? 20 : 40;
      let sum2 = (this.getStuffing(attr2) == 'cheese') ? 20 : (this.getStuffing(attr2) == 'salad') ? 5 : 10;
      let sum3 = 0;
      this.getToppings(attr3).forEach(elem => {
        sum3 = (elem == "spice") ? sum3 : sum3 + 5;
      });
      return sum1 + sum2 + sum3;
    }
  }

  btn.addEventListener('click', createHumburger);