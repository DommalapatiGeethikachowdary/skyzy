import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isLoggedIn(): boolean {

    if (localStorage.getItem('isLoggedin')) {
      return true;
    }
    this.router.navigate(['/auth']);
    return true;
  }
}
