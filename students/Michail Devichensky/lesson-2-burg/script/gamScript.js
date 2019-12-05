let BurForm = document.querySelector('#burgerform').addEventListener ('click', addBurger)
// BurForm
function addBurger () {
    let newBurger = new Burger('Burger', 'Ingredients', 'Seasonings')
   
        for(let v in newBurger) {
        let numArr = newBurger[v].split(',')
        var nArrr = numArr.map(function(el){   
           return +el
        })    
        console.log(nArrr)
       }
    document.querySelector('#price').innerHTML = nArrr[0] 
    document.querySelector('#calories').innerHTML = nArrr[1]
}
// class Convert {
//     constructor(newBurger) {
//        this.Burger = this._convert(newBurger)
//     //    this._convert() 
//     }
//     _convert(newBurger){
//         for(let v in this.newBurger) {
//             let numArr = this.newBurger[v].split(',')
//             let nArrr = numArr.map(function(el){   
//                return +el
//             })
//         }
//         _convert()// return this.nArrr
//     }
// }

class Burger {
    constructor(burger,ingredients ) {
      this.Burger = this._radio(burger)
    //   this.Ingredients = this._radio(ingredients)
    //   this.Seasonings = 
    }
    _radio(attrName) {
        let object = document.querySelector(`input[name=${attrName}]:checked`)
        return object.value
    }
}
