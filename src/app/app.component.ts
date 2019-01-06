import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private ngUnsubscribe = new Subject();

  constructor(auth: AuthService, router: Router, userService: UserService) {
    auth.user$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(user => {
      if (user) {
        userService.save(user);
        const url = localStorage.getItem('returnUrl');
        router.navigateByUrl(url);
      }
    });
  }
}
