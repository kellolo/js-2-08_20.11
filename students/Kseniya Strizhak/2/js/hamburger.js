//класс гамбургер
class hamburger {
    constructor (title, price, calories){
        this.title = title;
        this.price = price;
        this.calories = calories;
    }
    addCheese(){
        this.title += ", с сыром";
        this.price += 10;
        this.calories +=20
    }
    addSalad(){
        this.title += ", с салатом";
        this.price += 20;
        this.calories +=5
    }
    addPotato(){
        this.title += ", с картофелем";
        this.price += 15;
        this.calories +=10
    }
    addWeed(){
        this.title += ", с приправами";
        this.price += 15;
        this.calories += 0;
    }
    addMayonesse(){
        this.title += ", с майонезом";
        this.price += 20;
        this.calories += 5;
    }
}
const smallHamburger = new hamburger('маленький гамбургер', 50, 20);
smallHamburger.addCheese();
smallHamburger.addWeed();
console.log(smallHamburger);
const bigHamburger = new hamburger('большой гамбургер', 100, 40);
bigHamburger.addPotato();
bigHamburger.addMayonesse();
console.log(bigHamburger);