import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../service/services.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminLoginRef = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  errorMsg: string = "";

  constructor(private ss: ServicesService, private route: Router) { }

  ngOnInit(): void {
  }

  adminLogin() {
    let adminlogs = this.adminLoginRef.value;
    console.log(adminlogs);
    this.ss.adminLogin(adminlogs).subscribe({
      next:(result:any) => {
        if(result == "Logged in suucessfully"){
          this.route.navigate(['home']);
        } else {
          this.errorMsg = result
        }
      },
      error:(error:any) => console.log(error),
      complete:() => console.log("done")
    })
  }

}
