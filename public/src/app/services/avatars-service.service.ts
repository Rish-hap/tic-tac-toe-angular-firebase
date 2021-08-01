import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AxiosClient } from '../axios-client'

import axios, { AxiosResponse } from "axios"

import { url } from "../utils/url"

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AvatarsServiceService {
  constructor(private router:Router, private service:AxiosClient) { 
      
  }
  avatars: { src: string, id: number, name: string, selected: boolean, player: string, wins: number, loss: number }[] = []

  getAvatars(someData?: any): Observable<any> {
    return new Observable(
      (observer: any) => {
        if (this.avatars.length === 0) {
          (async () => {
            let data = await axios.get(`${url}/avatars/allAvatars`, {
              headers: {
                'x-access-token': localStorage.getItem('token')
              }
            })
              .then((res) => {
                return res.data;
              })
              .catch((err) => {
                return {
                  success: false,
                  message: err.message || "Unable to fetch avatars"
                }
              })
            observer.next(data)
          })()
        } else {
          if (someData) {
            observer.next({
              data: [...someData]
            })
          } else {
            observer.next({
              data: [...this.avatars]
            })
          }
        }
      }
    );
  }

  async get_avatars_from_backend() {
    let data: any = {}
    try {
      data = await axios.get(`${url}/avatars/allAvatars`, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return {
            success: false,
            message: "Unable to fetch avatars"
          }
        });
    } catch (error) {
      data = {
        success: false,
        message: "Unable to fetch avatars"
      }
    }
    return data
  }
  async check_avatars() {
    if (this.avatars.length === 0) {
      let data_from_backend = await this.get_avatars_from_backend()
      if (data_from_backend?.success) {
        this.avatars = [...data_from_backend.data]
      }
    }
  }


  async set_avatars_to_backend(avatars: any) {
    let data: any = {}
    try {
      data = await this.service.post(`${url}/avatars/update`, {
        avatars: [...avatars]
      }, (response: AxiosResponse) => response.data)

    } catch (error) {
      data = {
        success: false,
        message: "Unable to fetch avatars"
      }
    }
    return data
  }

  getStaticAvatars() {
    return [...this.avatars]
  }

  setAvatars(data: any) {
    this.avatars = [...data]
    this.set_avatars_to_backend([...data])
    // this.getAvatars([...data])
  }
}
