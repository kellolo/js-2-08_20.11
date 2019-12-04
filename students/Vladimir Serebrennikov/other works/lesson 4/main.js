    
    // Задание 1 и 2
    
    let str = "Lorem ipsum, 'dolor' sit amen't consectetur 'adipisicing' elit."
    
    class MathText {
      raplaceAllQuotes(string) {
        let template = /'/g
        return string.replace(template, '"')
      }
      raplaceSmartQuotes(string) {
        let template = /(?!n)'(?!t\s)/g
        return string.replace(template, '"')
      }
    }
    
    let editor = new MathText()
    
    console.log(editor.raplaceAllQuotes(str))
    console.log(editor.raplaceSmartQuotes(str))
    
    
    
    // Задание 3

    class Validator {
      constructor(classForm) {
        this.form = document.querySelector(classForm)
        this.listElement = []
        this.types = {
          name: [
            /^[a-z]{2,}$/i,
            'Поле для имени должно быть заполенно и содержать только буквы'
          ],
          phone: [
            /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            'Поле должно быть заполенно и соответсвовать шаблону +7(000)000-0000'
          ],
          email: [
            /^([a-z]+[a-z\-\.][a-z]+)+\@([a-z]{4})+\.([a-z]{2})$/i,
            'Поле e-mail должно быть заполенно и соответсвовать шаблону my-mail@mail.ru'
          ],
        }
      }

      addField(classField, typeValidation, textError) {
        this.listElement.push({ 
          name: classField, 
          type: typeValidation,
          text: textError
        })
      }

      addSubmit(classButton) {
        this.form.querySelector(classButton).addEventListener('click', () => {
          this.listElement.forEach(filed => {
            this._validation(filed.name, filed.type, filed.text)
          })
        });
      }

      _validation(name, type, text) {
        let regExp = this.types[type][0]
        let message = this.types[type][1]
        let element = this.form.querySelector(name)
        let valueField = element.value
        if (this.isValided(regExp, valueField)) {
          element.classList.remove('invalid')
        } else {
          element.classList.add('invalid')
          this._displayMeesage(message);  
        }
      }

      isValided(regExp, value) {
        return regExp.test(value)
      }
      
      _displayMeesage(text) {
        if (text) {
          alert(text)
        }
      }
    }

    let validForm1 = new Validator('.feedback')
    
    validForm1.addField('.input_name', 'name')
    validForm1.addField('.input_phone', 'phone')
    validForm1.addField('.input_email', 'email')
    validForm1.addSubmit('.btn-submit')