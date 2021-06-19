import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialogdata } from 'src/app/Model/employee.model';
@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss']
})
export class ActionDialogComponent implements OnInit {
  title = "";
  description = "";
  action = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: Dialogdata) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.description = this.data.description;
    this.action = this.data.action.toLowerCase();
  }
  executeAction() {
    switch (this.action) {
      case 'add':
        this.add();
        break;
      case 'delete':
        this.delete();
        break;
      case 'edit':
        this.update();
        break;
      default: break;

    }
  }
  add() {

  }
  delete() {

  }

  update() {

  }
}
