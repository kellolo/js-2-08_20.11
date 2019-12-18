Vue.component('failed-request', {
    data () {
        return {
            text: "Не удалось выполнить запрос",
        }
    },
    template: `
        <div>{{text}}</div>
    `
})