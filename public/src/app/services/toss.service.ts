import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TossService {

  constructor() { }
  flip_coin() {
    let x = (Math.floor(Math.random() * 2) === 0)
    if (x) {
      return "T"
    } else {
      return 'H'
    }
  }
}
