<template id="boat-list">
    <div class="overflow-auto">
        <b-nav pills>
            <b-nav-item>
                <router-link :to="{path: '/boat/new' }">
                    <b-button variant="primary"><b-icon icon="plus"></b-icon>Add Boat</b-button>
                </router-link>
            </b-nav-item>
            <b-nav-item class="ml-auto">
                 <b-form-input v-model="searchKey" placeholder="Search"></b-form-input>
            </b-nav-item>
        </b-nav>

        <b-table
          id="boats"
          :per-page="perPage"
          :current-page="currentPage"
          small
          :fields="fields"
          :items="filteredBoats"
          :busy="busy" >
          <template v-slot:cell(name)="data">
                <router-link :to="{path: '/boat/' + data.item.id }">{{ data.value }}</router-link>
          </template>
          <template v-slot:cell(thumbnail)="data">
                <b-img rounded :src="`/boats/${data.item.id % 6}.jpg`" thumbnail fluid width="64" :alt="data.item.name"></b-img>
          </template>
        </b-table>

        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="boats"
        ></b-pagination>
    </div>
</template>


<script>
    import api from '../Api'
    import {
        BPagination, BTable, BFormInput, BNav, BNavItem, BIcon, BButton, BImg
    } from 'bootstrap-vue'

    export default {
      name: 'List',
      template: '#boat-list',
      components: {
         BPagination, BTable, BFormInput, BNav, BNavItem, BIcon, BButton, BImg
      },
      data: () => ({
        boats: [],
        searchKey: '',
        busy: true,
        currentPage: 1,
        perPage: 6,
        fields: [ "thumbnail", "name", "description", "action" ]
      }),
      computed: {
        filteredBoats() {
          return this.boats
            .filter((boat) => `${boat.name} ${boat.description}`.toLowerCase().indexOf(this.searchKey.toLowerCase()) > -1)
        },
        rows() {
          return this.filteredBoats.length
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

<style>
     #boats td { vertical-align: middle; }
</style>