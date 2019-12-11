Vue.component ('post', {
    template: `<div class="post">
                    <button @click="togglePost"> {{ shown ? 'Скрыть' : 'Показать' }} </button>
                    <div v-show="shown" v-if="!error">
                        <div class="user">
                            <strong> {{ item.name }} </strong>
                        </div>
                        <div class="body">
                            {{ item.body }}
                        </div>
                        <div class="footer">
                            <a href="#">{{ item.email }}</a>
                        </div>
                    </div>
                    <h1 v-else>Какая-то ошибка</h1>
                    <button @click="$parent.parentMethod">Meth fr parent</button>
                </div>`,
    data () {
        return {
            shown: true,
            error: false
        }
    },
    props: ['item'],
    methods: {
        togglePost () {
            this.shown = !this.shown
        },
        setError (ev) {
            this.error = ev
        }
    },
    mounted () {
        console.log (this)
    }
})