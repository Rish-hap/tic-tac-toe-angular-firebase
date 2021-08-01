import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router, private auth:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let flag = this.check_token()
    return flag
  }

 check_token(){
   let token_available = !!localStorage.getItem('token')

    if(!token_available){
      localStorage.getItem('token')?localStorage.removeItem('token'):''
      localStorage.getItem('refresh-token')?localStorage.removeItem('refresh-token'):''
      this.router.navigate(['signin'])
    }
    return token_available
  }
  
}
