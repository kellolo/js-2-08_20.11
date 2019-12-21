/*Написать приложение-калькулятор, используя подход BDD. Приложение должно состоять из четырёх методов для сложения, вычитания, 
умножения и деления. Каждый метод принимает на вход два аргумента и выполняет действие. При написании тестов учесть случаи, когда на 
вход подаются не числа, а строки, null или undefined.*/

const addition = (a, b) => {
    if (a == null || b == null || typeof(a) === 'string' || typeof(b) === 'string' || a == undefined || b == undefined) {
        return null;
      }
    return a + b;
}
const difference = (a, b) => {
    if (a == null || b == null || typeof(a) === 'string' || typeof(b) === 'string' || a == undefined || b == undefined) {
        return null;
      }
    return a - b;

}
const division = (a, b) => {
    if (a == null || b == null || typeof(a) === 'string' || typeof(b) === 'string' || a == undefined || b == undefined || b == 0 ) {
        return null;
      }
    return a / b;
}
const multiplication = (a, b) => {
    if (a == null || b == null || typeof(a) === 'string' || typeof(b) === 'string' || a == undefined || b == undefined) {
        return null;
      }
    return a * b;
}

  module.exports = {
    addition: addition,
    difference: difference,
    division: division,
    multiplication: multiplication
  }