import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from 'src/app/core';

@Component({
  selector: 'app-team-creator',
  templateUrl: './team-creator.component.html',
  styleUrls: ['./team-creator.component.css']
})
export class TeamCreatorComponent implements OnInit {

  teamForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.teamForm = this.formBuilder.group({
      'team_name': [''],
      'team_logo': [''],
      'use_moral_metric': [''],
      'team_emails': ['']
    });
  }

  ngOnInit(): void {}

  submitForm() {
    const formValues = this.teamForm.value;
    console.log("Team Form Values: ", formValues);
  }

}
