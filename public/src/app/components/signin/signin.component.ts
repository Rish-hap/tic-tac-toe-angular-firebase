import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  name: string = ''
  password: string = ''
  constructor(private auth: AuthService, private router:Router) {
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  ngOnInit(): void { 
     localStorage.getItem('token')?localStorage.removeItem('token'):''
     localStorage.getItem('refresh-token')?localStorage.removeItem('refresh-token'):''
  }

  onChange(val: string, type: string) {
    if (type === 'name') {
      this.name = val
    } else {
      this.password = val
    }
  }

  async onSubmit() {
    if (((this.name === "") || (this.password === ''))) {
      window.alert('Enter name and password')
    } else {
      const { password, name } = this
      let result = await this.auth.signin(name, password)
      console.log(result, "result in onSubmit")
      if (result.success) {
            this.router.navigate(['choose-player'])
            localStorage.setItem('player',result.data.name)
      } else {
        window.alert(result.message)
      }
    }
  }

}
