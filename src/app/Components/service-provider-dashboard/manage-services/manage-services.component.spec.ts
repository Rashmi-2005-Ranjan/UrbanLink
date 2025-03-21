import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageServicesComponent } from './manage-services.component';

describe('ManageServicesComponent', () => {
  let component: ManageServicesComponent;
  let fixture: ComponentFixture<ManageServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
