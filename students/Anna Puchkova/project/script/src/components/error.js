Vue.component('error', {
    props: ['text'],
    template: `
    <div class="error_message">{{text}}</div>
    `,
})