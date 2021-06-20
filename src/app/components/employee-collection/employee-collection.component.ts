import { ChangeDetectorRef, Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Dialogdata, User } from 'src/app/Model/employee.model';
import { DataService } from 'src/app/services/data.service';
import { Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { DeletedUsers, DialogData } from 'src/app/data/data';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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



  myControl = new FormControl();
  myControlCompany = new FormControl();
  myControlAddress = new FormControl();
  
  deletedMyControl = new FormControl();
  deletedMyControlCompany = new FormControl();
  deletedMyControlAddress = new FormControl();

  options: string[] = [];
  optionsCompany: string[] = [];
  optionsAddress: string[] = [];
  
  deletedOptions: string[] = [];
  deletedOptionsCompany: string[] = [];
  deletedOptionsAddress: string[] = [];
  

  filteredOptions: Observable<string[]> = of([]);
  filteredOptionsCompany: Observable<string[]> = of([]);
  filteredOptionsAddress: Observable<string[]> = of([]);

  deletedFilteredOptions: Observable<string[]> = of([]);
  deletedFilteredOptionsCompany: Observable<string[]> = of([]);
  deletedFilteredOptionsAddress: Observable<string[]> = of([]);
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  /**
   *
   */
  constructor(public dataService: DataService,
    public shareddataservice: SharedDataService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataService.getEmployees().subscribe((response: any) => {
      this.users = response;
      this.shareddataservice.updateUsers(this.users);

      //autocomplete
     
      this.options = response.map((item: any) => item.name);
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );

      this.optionsCompany = response.map((item: any) => item.company.name);
      this.filteredOptionsCompany = this.myControlCompany.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCompany(value))
        );

      this.optionsAddress = response.map((item: any) => item.address.city);
      this.filteredOptionsAddress = this.myControlAddress.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterAddress(value))
        );


        //deleted users
        this.deletedOptions = DeletedUsers.map((item: any) => item.name);
        this.deletedFilteredOptions = this.deletedMyControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._deletedFilter(value))
          );
  
        this.deletedOptionsCompany = DeletedUsers.map((item: any) => item.company.name);
        this.deletedFilteredOptionsCompany = this.deletedMyControlCompany.valueChanges
          .pipe(
            startWith(''),
            map(value => this._deletedFilterCompany(value))
          );
  
        this.deletedOptionsAddress = DeletedUsers.map((item: any) => item.address.city);
        this.deletedFilteredOptionsAddress = this.deletedMyControlAddress.valueChanges
          .pipe(
            startWith(''),
            map(value => this._deletedFilterAddress(value))
          );
    })
    this.deletedUsers = DeletedUsers;
    this.shareddataservice.deletedUsers = DeletedUsers;

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1500
    });
  }
  openDialog(action: string, id = 0) {
    // alert(id);
    let dialogRef = this.dialog.open(ActionDialogComponent, {
      disableClose: true,
      width: '500px',
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
    
    this.users = new MatTableDataSource<User[]>();
    this.deletedUsers = new MatTableDataSource<User[]>();

    this.users.data = this.shareddataservice.users;
    this.deletedUsers.data = this.shareddataservice.deletedUsers;
   
    const users = this.shareddataservice.users;
    const deletedUsers = this.shareddataservice.deletedUsers;

    this.options = users.map((item: any) => item.name);
    this.optionsCompany = users.map((item: any) => item.company.name);
    this.optionsAddress = users.map((item: any) => item.address.city);

    this.deletedOptions = deletedUsers.map((item: any) => item.name);
    this.deletedOptionsCompany = deletedUsers.map((item: any) => item.company.name);
    this.deletedOptionsAddress = deletedUsers.map((item: any) => item.address.city);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  private _filterCompany(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsCompany.filter(option => option.toLowerCase().includes(filterValue));
  }



  private _filterAddress(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.optionsAddress.filter(option => option.toLowerCase().includes(filterValue));
  }

  // deleted users
  private _deletedFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.deletedOptions.filter(option => option.toLowerCase().includes(filterValue));
  }



  private _deletedFilterCompany(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.deletedOptionsCompany.filter(option => option.toLowerCase().includes(filterValue));
  }



  private _deletedFilterAddress(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.deletedOptionsAddress.filter(option => option.toLowerCase().includes(filterValue));
  }

  filterGridresults() {

    const nameFilterKeyword = this.myControl.value ? this.myControl.value : "";
    const companyFilterKeyword = this.myControlCompany.value ? this.myControlCompany.value : "";
    const addressFilterKeyword = this.myControlAddress.value ? this.myControlAddress.value : "";

    this.users = new MatTableDataSource<User[]>();
    const ul = this.shareddataservice.users;
    this.users.data = ul.filter((u: any) => {
      if (u.name.indexOf(nameFilterKeyword) != -1 && nameFilterKeyword !== "")
        return true;
      if (u.company.name.indexOf(companyFilterKeyword) != -1 && companyFilterKeyword != "")
        return true;

      if (u.address.city.indexOf(addressFilterKeyword) != -1 && addressFilterKeyword !== "")
        return true;

      return false;

    })

  }

  clearFilters() {

    this.myControl.setValue("");
    this.myControlCompany.setValue("");
    this.myControlAddress.setValue("");

    this.users = new MatTableDataSource<User[]>();
    this.users.data = this.shareddataservice.users;
  }
  clearValue(event: any) {
    event.target.value = "";
    this.filterGridresults();
  }

  clearDeletedFilters() {

    this.deletedMyControl.setValue("");
    this.deletedMyControlCompany.setValue("");
    this.deletedMyControlAddress.setValue("");

    this.deletedUsers = new MatTableDataSource<User[]>();
    this.deletedUsers.data = this.shareddataservice.deletedUsers;
  }
  clearDeletedValue(event: any) {
    event.target.value = "";
    this.deletedFilterGridresults();
  }

  // deleted uders
  deletedFilterGridresults() {

    const nameFilterKeyword = this.deletedMyControl.value ? this.deletedMyControl.value : "";
    const companyFilterKeyword = this.deletedMyControlCompany.value ? this.deletedMyControlCompany.value : "";
    const addressFilterKeyword = this.deletedMyControlAddress.value ? this.deletedMyControlAddress.value : "";

    this.deletedUsers = new MatTableDataSource<User[]>();
    const dul = this.shareddataservice.deletedUsers;
    this.deletedUsers.data = dul.filter((u: any) => {
      if (u.name.indexOf(nameFilterKeyword) != -1 && nameFilterKeyword !== "")
        return true;
      if (u.company.name.indexOf(companyFilterKeyword) != -1 && companyFilterKeyword != "")
        return true;

      if (u.address.city.indexOf(addressFilterKeyword) != -1 && addressFilterKeyword !== "")
        return true;

      return false;

    })

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