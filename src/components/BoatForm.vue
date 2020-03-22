<template id="boat-form">
    <div>
        <b-spinner v-if="busy" class="spinner"></b-spinner>
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="!busy">

            <b-alert variant="success" :show="success">Boat saved!</b-alert>
            <b-alert variant="danger" :show="error">Error saving the Boat don't let it sink!</b-alert>

            <b-container fluid class="boat-form">
                <b-row v-if="!!id">
                  <b-col sm="3">
                    <label for="name">Thumbnail</label>
                  </b-col>
                  <b-col sm="9">
                       <b-img rounded :src="`/boats/${id % 6}.jpg`" thumbnail fluid width="64" :alt="data.name"></b-img>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="3">
                    <label for="name">Type the Boat name</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-input id="name" type="text" v-model="data.name"></b-form-input>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="3">
                    <label for="name">Type the Boat Description</label>
                  </b-col>
                  <b-col sm="9">
                    <b-form-textarea
                          id="description"
                          v-model="data.description"
                          placeholder="Enter the description..."
                          rows="3"
                          max-rows="6"
                        ></b-form-textarea>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col sm="3"></b-col>
                  <b-col sm="9">
                      <b-button type="submit" variant="primary"><b-icon icon="gear-fill"></b-icon>{{actionTitle}}</b-button>
                      <b-button type="reset" variant="primary">Reset</b-button>
                      <b-button type="reset" variant="danger" v-if="!!id">Delete</b-button>
                  </b-col>
                </b-row>
            </b-container>
        </b-form>
    </div>
</template>

<script>
    import api from '../Api'

    export default {
        name: 'BoatEdit',
        template: '#boat-edit',
        props: {
            id: String
        },
        data: () => ({
            data: { },
            busy: true,
            success: false,
            error: false,
        }),
        computed: {
            actionTitle() {
                return !this.id ? "create" : "update"
            },
            action() {
                return (!this.id ? api.createNew : api.updateForId).bind(api)
            }
        },
        methods: {
            onSubmit() {
                this.busy = true
                this.action({
                        id:this.id,
                        name:this.data.name,
                        description:this.data.description
                    })
                    .then(this.onSuccess)
                    .catch(this.onError)
                    .finally(this.onLoaded)
            },
            onReset() {
                // Reset our form values
                this.data.name = ''
                this.data.description = ''

                // Trick to reset/clear native browser form validation state
                this.busy = true
                this.$nextTick(() => {
                  this.busy = false
                })
            },
            onError() {
                this.error = true
                setTimeout(() => this.error = false, 2000)
            },
            onSuccess() {
                this.success = true
                setTimeout(() => this.success = false, 2000)
            },
            onLoaded() {
               this.busy = false
            }
        },
        mounted() {
          if (!this.id) {
            return this.busy = false;
          }
          api.getById(this.id)
            .then((response) => this.data = response.data )
            .catch(this.onError)
            .finally(this.onLoaded)
        },
    }
</script>

<style>
    .spinner,
    button { margin: 0 1em 1em 0; }
    .boat-form .row { margin-top: 1em; }
</style>