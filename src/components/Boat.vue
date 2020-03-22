<template id="boat-details">
    <div>
        <b-card
            :title="data.name"
            :img-src="`/boats/${parseInt(id) % 6}.jpg`"
            :img-alt="data.name"
            img-top
         >
            <b-card-text>
              {{ data.description }}
            </b-card-text>

            <hr>
            <router-link class="boat-action" :to="{ path: `/boat/${id}/edit` }" sm="3">
                <b-button variant="primary"><b-icon icon="gear-fill"></b-icon>edit</b-button>
            </router-link>
          </b-card>
    </div>
</template>

<script>
    import api from '../Api'
    import { BIcon, BCard, BCardText, BButton } from 'bootstrap-vue'

    export default {
        name: 'Boat',
        template: '#boat-details',
        components: {
            BIcon, BCard, BButton, BCardText
        },
        props: {
            id: String
        },
        data: () => {
            return {
                data: { name: 'loading...' }
            }
        },
        mounted() {
          api.getById(this.id)
            .then((response) => this.data = response.data )
            .catch(() => this.data = { name: "Failed to loading the boat" })
        },
    }
</script>

<style>
    .boat-action { margin: 1em; }
</style>