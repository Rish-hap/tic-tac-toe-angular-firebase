import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';
import { url } from '../utils/url';

@Injectable({
  providedIn: 'root'
})
export class SearchClientService {
  constructor() { }

  search(data: any): Observable<any> {

    return new Observable((observer: any) => {
      (async () => {
        let items = await axios.get(`${url}/games/search?player1=${data.player1}&player2=${data.player2}&avatar1=${data.avatar1}&avatar2=${data.avatar2}`, {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        })
          .then((res) => {
            observer.next(res.data)
            return res.data
          })
          .catch((err) => {
            observer.next({
              success: false,
              message: "Unable to fetch Games"
            })
            return
          })
      })()
    })
  }
}
