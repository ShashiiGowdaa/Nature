import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedsComponent } from './seeds.component';

describe('SeedsComponent', () => {
  let component: SeedsComponent;
  let fixture: ComponentFixture<SeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeedsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
