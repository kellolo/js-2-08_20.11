Vue.component('error', {
    data(){
        return {
            text: ''
        }
    },
    methods: {
      setError(error){
          this.text = error
      },
      closeError() {
        this.setError('');
      }
    },
    computed: {
      isVisible(){
          return this.text !== ''
      }
    },
    template: `
    <div class="error-block" v-if="isVisible"> 
        <p class="error-msg">
            <button class="close-btn" @click="closeError">&times;</button>
            {{ text }}
        </p>
    </div>
    `
});