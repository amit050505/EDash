import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCollectionComponent } from './employee-collection.component';

describe('EmployeeCollectionComponent', () => {
  let component: EmployeeCollectionComponent;
  let fixture: ComponentFixture<EmployeeCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeCollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
