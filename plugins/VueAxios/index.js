import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import { baseURL } from '@/config'

axios.defaults.baseURL = baseURL.local
axios.interceptors.request.use((config) => {
  if (!config.params) {
    config.params = {}
    config.params.airport = ''
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

Vue.use(VueAxios, axios)
