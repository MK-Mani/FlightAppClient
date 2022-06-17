import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlinesAddEditComponent } from './airlines-add-edit.component';

describe('AirlinesAddEditComponent', () => {
  let component: AirlinesAddEditComponent;
  let fixture: ComponentFixture<AirlinesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlinesAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlinesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
