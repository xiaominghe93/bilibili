import axios from 'axios'
import router from '../src/router'
import Vue from 'vue'

const http = axios.create({
    baseURL: 'http://112.74.99.5:3000/web/api'
})

http.interceptors.request.use(function (config) {
    if(localStorage.getItem('token') && localStorage.getItem('id')){
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
 
http.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
     if(error.response.status == 401 || error.response.status == 402){
         router.push('/login')
         Vue.prototype.$msg.fail(error.response.data.message)
     }
    return Promise.reject(error);
  });

// // 为请求头设置token属性，并在之后的请求中携带该token 
// http.interceptors.request.use(config => {
//   console.log(config)
//   config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token')
//   //在最后必须 return config
//   return config
// })

// http.interceptors.response.use(config => {
//   return config
// })

export default http