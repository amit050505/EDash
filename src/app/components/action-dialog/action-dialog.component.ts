import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfigData, Dialogdata, User } from 'src/app/Model/employee.model';
import { DataService } from 'src/app/services/data.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss']
})
export class ActionDialogComponent implements OnInit {
  title = "";
  description = "";
  action = "";
  id = "";
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogConfigData,
  private dialogRef: MatDialogRef<ActionDialogComponent>,
  public dataService: DataService,
  public shareddataservice: SharedDataService) { }

  ngOnInit(): void {
    this.title = this.data.dialogData.title;
    this.description = this.data.dialogData.description;
    this.action = this.data.dialogData.action.toLowerCase();
    this.id = this.data.id;
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
    debugger;
    this.shareddataservice.deleteUser(this.id);
    this.dialogRef.close("success");

  }

  update() {

  }
}
