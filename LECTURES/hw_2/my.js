
let finalCost = document.querySelector(".finalCost span");
let finalCalorie = document.querySelector(".finalCalories span");
let btn = document.querySelector("button");
btn.addEventListener("click", countData);

function countData() {
    let newCounter = new Counter("input", ".burger_cost span", ".burger_calorie span");
    finalCost.innerHTML = newCounter.count;
    finalCalorie.innerHTML = newCounter.countcalorie;
}

class Counter {
    constructor(inputChecked, count, countcalorie) {
      this.inputChecked = this.findAllCheckedIndex(inputChecked);
      this.count = this.results(count);
      this.countcalorie = this.results(countcalorie);;
    }

    findAllCheckedIndex(inputChecked) {
        let temp = [];
        let inputs = document.querySelectorAll(`${inputChecked}`);
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked == true) {
                temp.push(i);
            }
        }
        return temp;
    }

        results(count) {
        let result = 0;
        let liItem = "";
        let counts = document.querySelectorAll(`${count}`);
        for (let i = 0; i < counts.length; i++) {
            if (this.inputChecked.indexOf(i) != -1) {
                result += +counts[i].innerText;
            }
        }
        return result;
    }
  }
  /*
  <div class="composition">
  <div class="title">Бургер `${name}`</div>
  <ul class="set">
      <li class="set_items"></li>
      <li class="set_items"></li>
      <li class="set_items"></li>
      <li class="set_items"></li>
      <li class="set_items"></li>
  </ul>
</div>*/
