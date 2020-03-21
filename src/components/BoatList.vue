<template id="boat-list">
    <div>
        <b-nav pills>
            <b-nav-item>
                <router-link :to="{path: '/boat/new' }">
                    <b-button variant="primary"><b-icon icon="plus"></b-icon>Add Boat</b-button>
                </router-link>
            </b-nav-item>
            <b-nav-item>
                 <b-form-input v-model="searchKey" placeholder="Search"></b-form-input>
            </b-nav-item>
        </b-nav>

        <b-table :fields="fields" :items="filteredBoats" :busy="busy" >
          <template v-slot:cell(name)="data">
                <router-link :to="{path: '/boat/' + data.item.id }">{{ data.value }}</router-link>
          </template>
        </b-table>
    </div>
</template>

<script>
    import api from '../Api'

    export default {
      template: '#boat-list',
      data: () => ({
        boats: [],
        searchKey: '',
        busy: true,
        fields: [ "name", "description", "action" ]
      }),
      computed: {
        filteredBoats() {
          return this.boats
            .filter((boat) => `${boat.name} ${boat.description}`.indexOf(this.searchKey) > -1)
        }
      },
      mounted() {
        api.getAll()
          .then((response) => this.boats = response.data )
          .catch(() => this.error = "Failed to load boats")
          .finally(() => this.busy = false)
      },
    }
</script>
