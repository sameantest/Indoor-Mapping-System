import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Locations } from '../model/location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  direct:Array<Locations> = [];
  flag: boolean = false;
  Retailor: string = "";
  Images: string = "";
  location: string = "";
  createdAt: string = "";
  updated: string = "";

  public locat: any;
  

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this._http.get(`http://localhost:3000/locator`).subscribe(data => {
      console.log(data);
      this.locat = data;
    })
  }



}
