import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Dialogdata, User } from 'src/app/Model/employee.model';
import { DataService } from 'src/app/services/data.service';
import { Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { DeletedUsers, DialogData } from 'src/app/data/data';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-employee-collection',
  templateUrl: './employee-collection.component.html',
  styleUrls: ['./employee-collection.component.scss']
})
export class EmployeeCollectionComponent {
  displayedColumns: string[] = ['name', 'company', 'address', "actions"];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  users: any = [];
  deletedUsers: any = [];

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
   *
   */
  constructor(public dataService: DataService,
    public shareddataservice: SharedDataService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) {

  }
  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataService.getEmployees().subscribe(response => {
      this.users = response;
      this.shareddataservice.updateUsers(this.users);

    })
    this.deletedUsers = DeletedUsers;
    this.shareddataservice.deletedUsers = DeletedUsers;
  }
  openDialog(action: string, id = 0) {
    // alert(id);
    let dialogRef = this.dialog.open(ActionDialogComponent, {
      data: {
        dialogData: DialogData.filter((item: Dialogdata) => item.action.toLowerCase() == action.toLowerCase())[0],
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value == "success")
        this.refreshData();
    });
  }

  edit(name: any) {
    alert(name);
  }
  delete(name: any) {
    alert(name);
  }

  refreshData() {
    debugger;
    
    
    this.users = new MatTableDataSource<User[]>();
    this.deletedUsers = new MatTableDataSource<User[]>();

    this.users.data = this.shareddataservice.users;
    this.deletedUsers.data = this.shareddataservice.deletedUsers;
   
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];