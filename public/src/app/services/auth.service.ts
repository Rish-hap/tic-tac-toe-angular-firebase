import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import axios from "axios"

import { url } from "../utils/url"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  async signin(name: string, password: string) {
    let data: any = {}
    try {
      data = await axios.post(`${url}/auth/signIn`, { name, password }, {
        headers: {
          auth_header: 'no'
        }
      })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.error(err.response.data, "error.response.data")
          let response = err.response.data
          return {
            ...response
          }
        })
    } catch (error) {
      console.log(error, "error in signin")
      data = {
        success: false,
        message: "Unable to Signin"
      }
    }
    return data
  }

    async isAuth(token: string|null) {
    let data: any = {}
    try {
      data = await axios.post(`${url}/auth/isAuth`, {token}, {
        headers: {
          auth_header: 'no'
        }
      })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.error(err.response.data, "error.response.data")
          let response = err.response.data
          return {
            ...response
          }
        })
    } catch (error) {
      console.log(error, "error in signin")
      data = {
        success: false,
        message: "Unable to Signin"
      }
    }
    return data
  }


}
