import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  template: `
    <h1>User profile</h1>
   `,
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // isAdmin = signal(false);

  constructor() { }

  ngOnInit() {
  }

}
