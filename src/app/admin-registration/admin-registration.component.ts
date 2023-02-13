import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminRegistration } from '../model/admin-registration';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css']
})
export class AdminRegistrationComponent implements OnInit {

  admin: AdminRegistration = new AdminRegistration(); 

  constructor(private route: Router, private _http: HttpClient) { }

  ngOnInit(): void {
  }

  AdminRegistration() {
    this._http.post("http://localhost:3000/adminReg", this.admin).subscribe(data => {
      console.log(data);
      this.route.navigate(['/admin-login']);
    }, err => {
      console.error(err)
    })
  }

}
