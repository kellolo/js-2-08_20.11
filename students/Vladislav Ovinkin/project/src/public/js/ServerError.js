'use strict';

Vue.component ('server-error', {
    data () {
        return {
            eNumber: 1,
            eText: "",
        }
    },
    methods: {
        setErrorData (num, msg) {
            this.eNumber = num;
            this.eText = msg;
        },
        clearErrorData () {
            this.eNumber = 1;
            this.eText = "";
        },
    },
    template: `
        <div class="eMessage" v-if="eNumber != 1">Ошибка сервера {{ eNumber }}: {{ eText }}.</div>
    `,
})