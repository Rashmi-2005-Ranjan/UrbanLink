import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStatusComponent } from './show-status.component';

describe('ShowStatusComponent', () => {
  let component: ShowStatusComponent;
  let fixture: ComponentFixture<ShowStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
