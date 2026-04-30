import { Component } from '@angular/core';
import { UserAuth } from '../../services/user-auth';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
 user: any;

  constructor(private auth: UserAuth) {
    //this.user = this.auth.getUser();
  }

  logout() {
    this.auth.logout();
  }
}
