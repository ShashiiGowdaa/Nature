import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaplingsComponent } from './saplings.component';

describe('SaplingsComponent', () => {
  let component: SaplingsComponent;
  let fixture: ComponentFixture<SaplingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaplingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaplingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
