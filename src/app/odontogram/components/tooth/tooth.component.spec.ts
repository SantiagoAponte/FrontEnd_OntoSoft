/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToothComponent } from './tooth.component';

describe('ToothComponent', () => {
  let component: ToothComponent;
  let fixture: ComponentFixture<ToothComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToothComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
