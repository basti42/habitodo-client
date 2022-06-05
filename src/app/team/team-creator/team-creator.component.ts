import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Metrics, MetricService, Template } from 'src/app/core';
import { Team } from 'src/app/core';
import { TeamService, UserService, TemplateService } from 'src/app/core';

@Component({
  selector: 'app-team-creator',
  templateUrl: './team-creator.component.html',
  styleUrls: ['./team-creator.component.css']
})
export class TeamCreatorComponent implements OnInit {

  teamForm: FormGroup;
  emailForm: FormGroup;
  emails: Array<String> = [];

  templates: Array<Template> = [];
  metrics: Array<Metrics> = [];

  constructor(
    private formBuilder: FormBuilder,
    private metricsService: MetricService,
    private teamService: TeamService,
    private userService: UserService,
    private templateService: TemplateService,
    private router: Router
  ) {
    this.templateService.currentTemplate.subscribe({
      next: templates => { this.templates = templates },
      error: err => { console.error("[Team Creator Component] template retrieval: ", err) }
    });

    // this.metricsService.currentUserMetrics.subscribe({
    //   next: metrics => { 
    //     this.metrics = metrics;
    //   },
    //   error: err => { 
    //     console.error("Error subscribing to metrics: ", err); 
    //   }
    // });

    this.teamForm = this.formBuilder.group({
      'team_name': [''],
      'team_logo': [''],
      'use_feedback_metric': [''],
      'feedback_interval': ['Weekly'],
      'effective_day': ['Tue'],
      'reminder': [true],
      'feedback_time_range': [3]
    });
    this.emailForm = this.formBuilder.group({
      'member_email': ['', Validators.email ]
    });
    this.metricsService.load();
  }

  ngOnInit(): void {}

  submitForm() {
    const formValues = this.teamForm.value;

    // TODO add metrics template id to team settings

    if (!(formValues.team_name.length <= 0) || !(this.emails.length <= 0 ) ){

      const team = {
        team_name: formValues.team_name, 
        team_id: "",
        team_logo: formValues.team_logo,
        created_at: new Date(),
        emails: this.emails,
        boards: [],
        members: [this.userService.getCurrentUser().user_id],
        admins: [this.userService.getCurrentUser().user_id],
        feedback_interval: formValues.feedback_interval,
        effective_day: formValues.effective_day,
        reminder: formValues.reminder, 
        feedback_time_range: formValues.feedback_time_range
      } as Team;
  
      // add team in backend
      console.log("Team: ", team);
      this.teamService.addTeam(team);
  
      // re-route to profile overview
      this.router.navigate(["profile", this.userService.getCurrentUser().username]);
    } else {
      console.log("[TEAM CREATOR] team must have a name and at least 1 member other than yourself.");
    }
  
  }

  addEmail(){
    const emailValue = this.emailForm.value.member_email;
    if (!(emailValue.length <= 0)){
      this.emails.push(emailValue);
      this.emailForm.setValue({'member_email': ''});
      console.log("Emails: ", this.emails);
    }
  }

  reload_metrics(){
    console.log("Reloading metrics");
    this.metricsService.load();
  }

  removeEmailOnClick(email: String){
    console.debug("[Team creator] Removing email: ", email);
    let index = this.emails.indexOf(email);
    if (index !== -1) {
      this.emails.splice(index, 1);
    }
  }

}
