import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManureComponent } from './manure.component';

describe('ManureComponent', () => {
  let component: ManureComponent;
  let fixture: ComponentFixture<ManureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
