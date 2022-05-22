import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Metrics, MetricService } from 'src/app/core';
import { Team } from 'src/app/core';
import { TeamService, UserService } from 'src/app/core';

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
    private teamService: TeamService,
    private userService: UserService,
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
    
    const team = {
      team_name: formValues.team_name, 
      team_id: "",
      team_logo: formValues.team_logo,
      created_at: new Date(),
      emails: this.emails,
      boards: [],
      members: [this.userService.getCurrentUser().user_id],
      admins: [this.userService.getCurrentUser().user_id]
    } as Team;

    // add team in backend
    console.log("Team: ", team);
    this.teamService.addTeam(team);

    // re-route to profile overview
    this.router.navigate(["profile", this.userService.getCurrentUser().username]);

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
