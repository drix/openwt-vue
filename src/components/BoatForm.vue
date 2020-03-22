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
                      <b-button type="submit" variant="primary" :disabled="!valid">
                        <b-icon icon="gear-fill"></b-icon>{{actionTitle}}
                      </b-button>
                      <b-button type="reset" variant="primary">Reset</b-button>
                      <b-button v-b-toggle="'delete-confirm'" v-if="!!id">Delete</b-button>


                      <b-collapse id="delete-confirm">
                        <hr>
                        <b-row>
                            <b-col sm="9">
                                Are you sure you want to sink this boat?
                            </b-col>
                            <b-col sm="3">
                                <b-button variant="danger" sm="3" v-on:click="onDelete($event)">Confirm</b-button>
                            </b-col>
                        </b-row>
                      </b-collapse>
                  </b-col>
                </b-row>
            </b-container>
        </b-form>
    </div>
</template>

<script>
    import api from '../Api'
    import {
        BIcon, BCollapse, BRow, BCol, BContainer, BSpinner, BImg,
        BForm, BFormTextarea, BFormInput, BButton, BAlert
    } from 'bootstrap-vue'

    export default {
        name: 'BoatForm',
        template: '#boat-form',
        components: {
            BIcon, BCollapse, BRow, BCol, BContainer, BSpinner, BImg,
            BForm, BFormTextarea, BFormInput, BButton, BAlert
        },
        props: {
            id: String
        },
        data: () => ({
            data: { },
            busy: true,
            success: false,
            error: false,
            api
        }),
        computed: {
            actionTitle() {
                return !this.id ? "create" : "update"
            },
            action() {
                return (!this.id ? api.createNew : api.updateForId).bind(api)
            },
            valid() {
                return this.data.name && this.data.name.length > 0
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
            onDelete(){
                this.busy = true
                api.removeForId(this.id)
                    .then(() => this.$router.replace('/boat'))
                    .catch(this.onError)
                    .finally(this.onLoaded)
            },
            onError() {
                this.error = true
                setTimeout(() => this.error = false, 2000)
            },
            onSuccess() {
                if(!this.id) return this.$router.replace('/boat')
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