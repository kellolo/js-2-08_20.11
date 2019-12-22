let BurForm = document.querySelector('#burgerform').addEventListener ('click', addBurger)
// let newBurger = new Burger('Burger')

class Burger {
    constructor(burger) {
      this.Burger = this._radio(burger) 
    }
    _radio(attrName) {
        let object = document.querySelector(`input[name=${attrName}]:checked`)
        return object.value
    }
}

// BurForm
function addBurger () {
let newBurger = new Burger('Burger')
 let f = newBurger.Burger.split(',')
    //     for(let v in newBurger) {
    //     let numArr = newBurger[v].split(',')
    //     var nArrr = numArr.map(function(elem){   
    //        return +elem
    //     })    
    //     console.log(nArrr)
    //    }
    // document.querySelector('#price').innerHTML = nArrr[0] 
    // document.querySelector('#calories').innerHTML = nArrr[1]
    console.log(f)
}


    
