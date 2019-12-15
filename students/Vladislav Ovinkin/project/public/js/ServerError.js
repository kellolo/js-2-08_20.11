'use strict';

Vue.component ('server-error', {
    data () {
        return {
            eNumber: 0,
            eText: "",
        }
    },
    methods: {
        setErrorData (num, msg) {
            this.eNumber = num;
            this.eText = msg;
        },
        clearErrorData () {
            this.eNumber = 0;
            this.eText = "";
        },
    },
    template: `
        <div class="eMessage" v-if="eNumber">Ошибка сервера {{ eNumber }}: {{ eText }}.</div>
    `,
})