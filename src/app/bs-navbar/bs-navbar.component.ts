import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../Models/AppUser';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})

export class BsNavbarComponent {
private ngUnsubscribe = new Subject();

  appUser: AppUser;
  constructor(private auth: AuthService) {
    auth.appUser$.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(appuser => this.appUser = appuser);
  }

  logout() {
    this.auth.logout();
  }
}
