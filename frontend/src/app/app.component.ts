import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';

import { HeaderComponent } from './shared/header/header.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'BusySoftware';
   hideHeader=false;
   constructor(private _route:Router){
   }

   ngOnInit(): void {
    this._route.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.hideHeader=event.url.startsWith('/busypage')
      }
    })
     }
   
  

}


