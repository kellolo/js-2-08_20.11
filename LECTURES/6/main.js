let app = new Vue ({
    el: '#app', 
    data: {     
        test: 'Hello Vue',
        requestedPosts: [],
        arr: [1, 2, 3, 4, 5],
        limit: 10,
        firstPost: 0,
        demoPost: 0
    },
    methods: {
        getJSON (url) {
            fetch (url)
                .then (d => d.json ())
                .then (data => {this.requestedPosts = data})
        },
        reload () {
            this.getJSON ('https://jsonplaceholder.typicode.com/comments?_limit=' + this.limit)
        },
        parentMethod () {
            console.log ('Method from outside')
        },
        check () {
            if (+this.firstPost > this.requestedPosts.length) {
                this.$refs['demo-post'].setError (true)
            } else {
                this.demoPost = this.firstPost
                this.$refs['demo-post'].setError (false)
            }
            console.log (this.$refs['demo-post'].error)
        }
    },
    computed: {
        testComputed () {
            console.log ('Я пишу вычисляху')
            return 'I am computed'
        }
    },
    mounted () {
        this.getJSON ('https://jsonplaceholder.typicode.com/comments?_limit=' + this.limit)
    }
    // components: {
    //     //компоненты
    // }
})