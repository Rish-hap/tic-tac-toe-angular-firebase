import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import axios, { AxiosRequestConfig } from "axios"

import { RouterService } from "../src/app/services/router.service"

import { time_diff, parseJwt } from './app/utils/common_utils';

// const jwt = require('jsonwebtoken');

import { url } from './app/utils/url';



const check_token = (request: AxiosRequestConfig) => {
  console.log(request, "url in check_token")
  let headers = request.headers
  if (headers['x-access-token']) {
    return true
  } else {
    return false
  }
}


// Request Interceptors
axios.interceptors.request.use(async request => {
  let url_string: string | undefined = request.url
  let headers = request.headers

  let flag = check_token(request)
  if (url_string?.includes('auth')) {
    if (flag) {
      throw new axios.Cancel('Operation canceled by the user.')
    }

  } else {
    // if (!flag) {
    //   throw new axios.Cancel('Operation canceled by the user.');
    // }
    request.headers['x-access-token'] = localStorage.getItem('token')
  }

  if (flag) {
    try {
      // Get token from  headers 
      let token = request.headers['x-access-token']

      // get the payload from the token
      let jwt_payload = parseJwt(token)

      // cureent time and expiry time
      let current_time = new Date()
      let expiry_time = new Date(jwt_payload.exp * 1000)

      // calculatate the time difference
      let diff = time_diff(expiry_time, current_time)

      // If difference is less than 300 seconds get new tokens from the Auth Server
      if (diff < 300) {
        let data = await axios.post(`${url}/auth/getToken`,
          {
            "refresh_token": localStorage.getItem('refresh-token'),
            "name": localStorage.getItem('player')
          })
          .then(res => {
            console.log(res, "res in error case")
            if (res.status === 200) {
              console.log("Setting Token in localStorage")
              // 1) put tokens to LocalStorage
              localStorage.setItem('token', res.data.tokens.access)
              localStorage.setItem('refresh-token', res.data.tokens.refresh)
              return res.data
            } else {
              return res.data
            }

          }).catch(error => {
            console.log(error, "error in getToken interceptor")
            localStorage.getItem('token') ? localStorage.removeItem('token') : ''
            localStorage.getItem('refresh-token') ? localStorage.removeItem('refresh-token') : ''
            return error
          })
      }
    } catch (error) {
      console.log(error,"error | Axios Request Interceptor")
    }
  }

  return request
},
  error => {
    return Promise.reject(error)
  }
)

// Response Interceptors

axios.interceptors.response.use(response => {
  console.log(response, "response in axios.interceptor")

  //checking for tokens
  let tokens = response.data.tokens

  if (tokens) {
    localStorage.setItem('token', tokens.access)
    localStorage.setItem('refresh-token', tokens.refresh)
  }

  return response
},
  async error => {
    const response = error.response;
    if (response.status === 401) {
      localStorage.getItem('token') ? localStorage.removeItem('token') : ''
      localStorage.getItem('refresh-token') ? localStorage.removeItem('refresh-token') : ''
    }
    // if (error.response.status === 401 && !originalRequest._retry) {

    //   originalRequest._retry = true;
    //   let data = await  axios.post(`${url}/auth/getToken`,
    //     {
    //       "refresh_token": localStorage.getItem('refresh-token'),
    //       "name": localStorage.getItem('player')
    //     })
    //     .then(res => {
    //       console.log(res,"res in error case")
    //       if (res.status === 200) {
    //         console.log("Setting Token in localStorage")
    //         // 1) put tokens to LocalStorage
    //         localStorage.setItem('token',res.data.tokens.access)
    //         localStorage.setItem('refresh-token',res.data.tokens.refresh)
    //         // localStorageService.setToken(res.data);

    //         // 2) Change Authorization header
    //         // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();

    //         // 3) return originalRequest object with Axios.
    //         return axios(originalRequest);
    //       } else {
    //         return res
    //       }

    //     }).catch(error => {
    //       console.log(error,"error in ----------")
    //     })
    // }

    // if (error.response.status === 401 &&
    //   originalRequest.url === 'http://localhost:5005/diablo2343/us-central1/v1/v1/auth/getToken') {
    //   // router.push('/signin');
    //   return Promise.reject(error);
    // }


    return Promise.reject(error)
  })

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
