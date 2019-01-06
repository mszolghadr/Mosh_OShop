import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { AppUser } from './Models/AppUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) {
  }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(map((appUser: AppUser) => appUser.isAdmin));
  }
}
