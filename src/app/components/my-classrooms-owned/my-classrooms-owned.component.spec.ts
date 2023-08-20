import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClassroomsOwnedComponent } from './my-classrooms-owned.component';

describe('MyClassroomsOwnedComponent', () => {
  let component: MyClassroomsOwnedComponent;
  let fixture: ComponentFixture<MyClassroomsOwnedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyClassroomsOwnedComponent]
    });
    fixture = TestBed.createComponent(MyClassroomsOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
