import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { url } from "../utils/url"
import { time_diff, parseJwt } from "../utils/common_utils"

@Injectable({
    providedIn: 'root'
})
class AxiosClient {
    service = axios.create()

    constructor(private router: Router) {
        this.service.interceptors.response.use(this.handleSuccess, this.handleError)
        this.service.interceptors.request.use(this.handleRequest, this.handleError)
    }

    public redirectTo = (route: string) => {
        localStorage.getItem('token') ? localStorage.removeItem('token') : ''
        localStorage.getItem('refresh-token') ? localStorage.removeItem('refresh-token') : ''
        this.router.navigate(['signin'])
    }

    public handleSuccess = (response: AxiosResponse) => {
        return response
    }

    public check_token = (request: AxiosRequestConfig) => {
        let headers = request.headers
        if (headers['x-access-token']) {
            return true
        } else {
            return false
        }
    }

    public handleRequest = async (request: AxiosRequestConfig) => {
        let url_string: string | undefined = request.url
        let flag = this.check_token(request)

        try {
            if (url_string?.includes('auth')) {
                if (flag) {
                    localStorage.getItem('token') ? localStorage.removeItem('token') : ''
                    localStorage.getItem('refresh-token') ? localStorage.removeItem('refresh-token') : ''
                    throw new axios.Cancel('Operation canceled by the user.')
                }
            } else {
                request.headers['x-access-token'] = localStorage.getItem('token')

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
                if (diff < 20) {
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
                            localStorage.getItem('token') ? localStorage.removeItem('token') : ''
                            localStorage.getItem('refresh-token') ? localStorage.removeItem('refresh-token') : ''
                            return error
                        })
                } else {
                    // throw new axios.Cancel('Operation cancelled by the user')

                }

            }

        } catch (error) {
            console.log(error, "error in index.ts")
        }
        return request
    }




    public handleError = (error: any) => {
        switch (error.response.status) {
            case 401:
                this.redirectTo('signin')
                break;

        }
        return Promise.reject(error)
    }

    public get = async (path: string, callback: Function, data?: any, addonHeaders?: any) => {
        return this.service.get(path)
            .then((response) => callback(response)
            )
    }

    public post = async (path: string, data: any, callback: Function, addonHeaders?: any) => {
        return this.service.post(path, data)
            .then((response) => callback(response))
    }
}

export {
    AxiosClient
}