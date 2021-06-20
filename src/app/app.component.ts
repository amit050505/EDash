import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'edash';

  constructor(private notificationservice: NotificationService,
    private _snackBar: MatSnackBar) {
    this.notificationservice.notification.subscribe(response => {
      this._snackBar.open(response, "", {
        duration: 1500
      });
    })
  }
}
