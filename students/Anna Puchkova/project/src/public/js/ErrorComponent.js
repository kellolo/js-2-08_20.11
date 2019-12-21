const error = {
    data(){
        return {
            erroMessage: '',
        }
    },
    methods: {
        setError(error){
           this.erroMessage = error;
        }
    },
    template: `<div class="error" v-if="erroMessage">
<div><button @click="erroMessage = ''" type="button" class="close">
                        <i class="fas fa-times"></i>
                    </button>
</div>

                    <div> {{ erroMessage }} </div>



</div>`
};

export default error;
