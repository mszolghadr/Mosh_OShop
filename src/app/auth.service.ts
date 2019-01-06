import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './Models/AppUser';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
     private route: ActivatedRoute,
      private userService: UserService) {
    this.user$ = afAuth.authState;
   }
  user$: Observable<firebase.User>;

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

   get appUser$(): Observable<AppUser> {
     if(this.user$) {
      return this.user$.pipe(switchMap(
        (user: firebase.User) => this.userService.get(user.uid)
        .valueChanges()));
      }
      return of(null);
   }
}
