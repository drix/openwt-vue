import axios from 'axios'
//import Vue from 'vue'

//const SERVER_URL = 'http://localhost:8090';
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
    createNew(name, description) {
      return this.execute('POST', 'boat', { name, description })
    },
    // (R)ead
    getAll() {
      return this.execute('GET','boat', null, {
        transformResponse: [ JSON.parse ]
      })
    },
    getById(id) {
      return this.execute('GET', `boat/${id}`, null, {
        transformResponse: [ JSON.parse ]
      })
    },
    // (U)pdate
    updateForId(id, name, description) {
      return this.execute('PUT', `boat/${id}`, { name, description })
    },
    // (D)elete
    removeForId(id) {
      return this.execute('DELETE', `boat/${id}`)
    }
}