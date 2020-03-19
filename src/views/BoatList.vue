<template id="boat-list">
    <div>
      <div class="actions">
        <a class="btn btn-default">
          <router-link :to="{path: '/boat/new'}">
            <span class="glyphicon glyphicon-plus"></span>
            Add Boat
          </router-link>
        </a>
      </div>
      <div class="filters row">
        <div class="form-group col-sm-3">
          <input placeholder="Search" v-model="searchKey" class="form-control" id="search-element" required />
        </div>
      </div>
      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th class="col-sm-2">Actions</th>
        </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
</template>

<script>
    import api from '../Api'

    export default {
      template: '#boat-list',
      data: () => ({ boats: [], searchKey: ''}),
      computed: {
        filteredBoats() {
          return this.boats.filter((boat) => {
            return boat.name.indexOf(this.searchKey) > -1
              || boat.description.indexOf(this.searchKey) > -1
              || boat.price.toString().indexOf(this.searchKey) > -1
          })
        }
      },
      mounted() {
        api.getAll()
          .then(response => {
            this.$log.debug("Data loaded: ", response.data)
            this.boats = response.data
        })
          .catch(() => {
            this.error = "Failed to load todos"
        })
          .finally(() => this.loading = false)
      },
    }
</script>
