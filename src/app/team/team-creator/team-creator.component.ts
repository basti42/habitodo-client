import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Metrics, MetricService } from 'src/app/core';

@Component({
  selector: 'app-team-creator',
  templateUrl: './team-creator.component.html',
  styleUrls: ['./team-creator.component.css']
})
export class TeamCreatorComponent implements OnInit {

  teamForm: FormGroup;
  emailForm: FormGroup;
  emails: Array<String> = [];

  metrics: Array<Metrics> = [];

  constructor(
    private formBuilder: FormBuilder,
    private metricsService: MetricService,
    private router: Router
  ) {
    this.metricsService.currentMetrics.subscribe({
      next: metrics => { 
        this.metrics = metrics;
      },
      error: err => { 
        console.error("Error subscribing to metrics: ", err); 
      }
    });
    this.teamForm = this.formBuilder.group({
      'team_name': [''],
      'team_logo': [''],
      'use_moral_metric': ['']
    });
    this.emailForm = this.formBuilder.group({
      'member_email': ['', Validators.email ]
    });
    this.metricsService.load();
  }

  ngOnInit(): void {}

  submitForm() {
    const formValues = this.teamForm.value;
    console.log("Team Form Values: ", formValues);
  }

  addEmail(){
    const emailValue = this.emailForm.value.member_email;
    this.emails.push(emailValue);
    this.emailForm.setValue({'member_email': ''});
    console.log("Emails: ", this.emails);
  }

  reload_metrics(){
    console.log("Reloading metrics");
    this.metricsService.load();
  }

}
