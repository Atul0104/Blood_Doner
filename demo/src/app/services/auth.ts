import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuth } from './user-auth';

@Injectable({
  providedIn: 'root',
})
export class Auth implements CanActivate {
   
 
  constructor(private auth: UserAuth, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
