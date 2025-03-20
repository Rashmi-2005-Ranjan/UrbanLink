import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchServicesComponent } from './search-services.component';

describe('SearchServicesComponent', () => {
  let component: SearchServicesComponent;
  let fixture: ComponentFixture<SearchServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
