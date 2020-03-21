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

            <b-button href="#" variant="primary">edit</b-button>
          </b-card>
    </div>
</template>

<script>
 import api from '../Api'

    export default {
        name: 'Boat',
        template: '#boat-details',
        props: {
            id: String
        },
        data: () => ({
            data: { name: 'loading...' },
            busy: true,
        }),
        mounted() {
          api.getById(this.id)
            .then((response) => this.data = response.data )
            .catch(() => this.error = "Failed to load boats")
            .finally(() => this.busy = false)
        },
    }
</script>