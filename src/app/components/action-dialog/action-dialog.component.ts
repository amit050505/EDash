import { Component, Inject, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfigData, Dialogdata, User } from 'src/app/Model/employee.model';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
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
  EmployeeForm: FormGroup = this.buildForm();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogConfigData,
    private dialogRef: MatDialogRef<ActionDialogComponent>,
    public dataService: DataService,
    public shareddataservice: SharedDataService,
    public fb: FormBuilder,
    private notificationservice: NotificationService) { }

  ngOnInit(): void {
    this.title = this.data.dialogData.title;
    this.description = this.data.dialogData.description;
    this.action = this.data.dialogData.action.toLowerCase();
    this.id = this.data.id;
    this.buildForm();
    if(this.action.toLowerCase() == "edit")
    this.bindEmployeeData();
  }
  
  bindEmployeeData() {
    const usr = this.shareddataservice.getUser(this.id);
    this.EmployeeForm.get("name")?.setValue(usr.name);
    this.EmployeeForm.get("company")?.setValue(usr.company?.name);
    this.EmployeeForm.get("address")?.setValue(usr.address?.city);
  }

  buildForm() {
    return this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      address: ['', Validators.required]
    });
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
      case 'restore':
        this.restore();
        break;
      default: break;

    }
  }

  add() {

    if (!this.EmployeeForm.valid) {
      this.notificationservice.showmessage("Please eneter all the details");
      return;
    }

    const emp: User = {
      id: Math.floor(Math.random() * 600) + 100,
      name: this.EmployeeForm.get("name")?.value,
      address:
      {
        city: this.EmployeeForm.get("address")?.value
      },
      company: {
        name: this.EmployeeForm.get("company")?.value.toString()
      }


    };
    console.log(emp);
    this.shareddataservice.addUser(emp);
    this.dialogRef.close("success");
    this.notificationservice.showmessage("Employee added successfuly");
  }

  delete() {
    this.shareddataservice.deleteUser(this.id);
    this.dialogRef.close("success");
    this.notificationservice.showmessage("Employee deleted successfuly");

  }

  restore() {
    this.shareddataservice.restoreUser(this.id);
    this.dialogRef.close("success");
    this.notificationservice.showmessage("Employee restored successfuly");

  }

  update() {
    const updatedUserDetails: User = {
      id : parseInt(this.id),
      name: this.EmployeeForm.get("name")?.value,
      address:
      {
        city: this.EmployeeForm.get("address")?.value
      },
      company: {
        name: this.EmployeeForm.get("company")?.value.toString()
      }
    };

    this.shareddataservice.updateUser(this.id, updatedUserDetails);
    this.dialogRef.close("success");
    this.notificationservice.showmessage("Employee details updated successfuly");
  }
}
