import { Component, OnInit } from '@angular/core';
import { User, UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'habitodo-client';

  constructor(private userService: UserService) {}

  ngOnInit(){
    this.userService.populate();
  }

}
