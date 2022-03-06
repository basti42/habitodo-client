import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../core';

@Directive({
  selector: '[appShowAuthed]'
})
export class ShowAuthedDirective implements OnInit{

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) { }

  // this needs to be a setter, to be updated on change
  // else ngOnChange needs to be implemented
  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }

  condition: boolean = false;

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe({
      next: isAuthenticated => {
        console.log("DIRECTIVE: isAuthenticated: ", isAuthenticated);
        console.log("DIRECTIVE: condition: ", this.condition);
        // show home, login and register when user not authed and directive is false
        if (!isAuthenticated && !this.condition){
          console.log(this.viewContainer);
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }, 
      error: err => console.error("AppShownAuthed Directive: ", err)
    });
  }



}
