import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  @Output() notification = new EventEmitter();

  constructor() { }

  showmessage(message: string) {
    this.notification.emit(message);
  }
}
