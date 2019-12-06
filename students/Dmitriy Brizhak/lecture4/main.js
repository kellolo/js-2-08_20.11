const btn = document.querySelector ('#ok')
btn.addEventListener ('click', e => valid.submit(e))

class Valid {
    constructor () {
        this.value = document.querySelectorAll('.form-control')
        this.alert = []
    }
    submit (e) {
        e.preventDefault() 
        this.removeAlert ()
        this.value.forEach ((item, i) => {
            if (!this.valid (item.value, item.dataset['reg'])) {
                this.alert[i] = this.addAlert(item, item.dataset['alert'])
                item.classList.add('border-red')
            } else {
                item.classList.remove('border-red')
            }
        })      
    }
    valid (text, textReg) {
        const reg = new RegExp(textReg)
        return reg.test(text)
    }
    addAlert(target, text) {
        const elem = document.createElement('div')
        elem.classList.add('alert','alert-danger')
        elem.innerText = text
        target.before(elem)
        return elem
    }
    removeAlert () {
        this.alert.forEach (item => {
            if (item) item.remove()
        })
        this.alert = []
    }   
}
const valid = new Valid() 