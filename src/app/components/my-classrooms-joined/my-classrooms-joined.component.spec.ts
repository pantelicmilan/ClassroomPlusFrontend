import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClassroomsJoinedComponent } from './my-classrooms-joined.component';

describe('MyClassroomsJoinedComponent', () => {
  let component: MyClassroomsJoinedComponent;
  let fixture: ComponentFixture<MyClassroomsJoinedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyClassroomsJoinedComponent]
    });
    fixture = TestBed.createComponent(MyClassroomsJoinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
