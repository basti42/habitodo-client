import { Component, Input, OnInit } from '@angular/core';
import { Cardbody } from 'src/app/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() title: String = "";
  @Input() body: Array<Cardbody> = [];

}
