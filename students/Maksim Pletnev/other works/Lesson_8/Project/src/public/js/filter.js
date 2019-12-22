let filterComp = {
  data () {
      return {
          userSearch: ''
      }
  },
  template: `
        <form action="#" class="search-form" @submit.prevent="$root.$refs.cata.filter (userSearch)">
          <input type="text" class="search-field" v-model="userSearch">
          <button class="btn-search" type="submit">
              <i class="fas fa-search"></i>
          </button>
        </form>
      `
}

export default filterComp
© 2019 GitHub, Inc.