Vue.component('error', {
  data() {
    return {
      error: '',
      show: false
    }
  },
  methods: {
    viewError(text) {
      this.error = text
      this.show = true
    }
  },
  template: ` 
    <div v-show="this.show"> 
                    <span>{{this.error}}</span>
                </div>
                `
})