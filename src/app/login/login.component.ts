import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Registration } from '../model/registration';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register: Registration = new  Registration();
  users: Array<Registration> = [];

  constructor(private _route: Router, private _http: HttpClient) { }

  ngOnInit(): void {
    this._http.get<Registration[]>(`http://localhost:3000/register`).subscribe(data => {
      this.users = data;
      console.log(data);
    }, err => {
      console.error(err);
    })
  }

  login() {
    if(this.isUserExist()) {
      localStorage.setItem('isLogedIn', "true");
      this._route.navigate(['/home'])
    }
  }

  isUserExist(){
    for(const register of this.users) {
      if(register.Email == this.register.Email && register.Password == this.register.Password) {
        return true;
      }
    }
    return false;
  }

}
