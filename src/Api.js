import axios from 'axios'
//import Vue from 'vue'

const SERVER_URL = 'http://iotech.club:8090';

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000
});


export default {
    async execute(method, resource, data, config) {
        //let accessToken = await Vue.prototype.$auth.getAccessToken()
        return instance({
          method:method,
          url: resource,
          data,
//          headers: {
//                Authorization: `Bearer ${accessToken}`
//          },
          ...config
        })
    },

    // (C)reate
    createNew(text, completed) {
      return this.execute('POST', 'boat', {title: text, completed: completed})
    },
    // (R)ead
    getAll() {
      return this.execute('GET','boat', null, {
        transformResponse: [function (data) {
          return data? JSON.parse(data)._embedded.todos : data;
        }]
      })
    },
    // (U)pdate
    updateForId(id, text, completed) {
      return this.execute('PUT', 'boat/' + id, { title: text, completed: completed })
    },
    // (D)elete
    removeForId(id) {
      return this.execute('DELETE', `boat/${id}`)
    }
}