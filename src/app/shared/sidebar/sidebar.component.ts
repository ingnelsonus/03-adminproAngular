import { Component, OnInit } from '@angular/core';
import { SodebarService } from 'src/app/services/sodebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems:any[] ;

  constructor(private sodebarservice:SodebarService) {
    this.menuItems=sodebarservice.menu;
   }

  ngOnInit(): void {
  }

}
