import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DELETED_ELEMENT_DATA, ELEMENT_DATA } from 'src/app/data/data';
import { Employee, User } from 'src/app/Model/employee.model';
import { map, startWith } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-collection',
  templateUrl: './employee-collection.component.html',
  styleUrls: ['./employee-collection.component.scss']
})
export class EmployeeCollectionComponent implements OnInit {

  displayedColumns = ['name', 'company', 'address'];
  users: any = [];

  employeeForm = this.fb.group({
    name: [''],
    company: [''],
    address: [''],
    dname: [''],
    dcompany: [''],
    daddress: ['']
  });

  constructor(private fb: FormBuilder, public dataservice: DataService) {
    this.dataservice.getEmployees().subscribe(response => {
      console.log(response);
      this.users = response;
    })
  }

  ngOnInit(): void {
  }

}
