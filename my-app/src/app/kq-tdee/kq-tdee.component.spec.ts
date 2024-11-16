import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KqTdeeComponent } from './kq-tdee.component';

describe('KqTdeeComponent', () => {
  let component: KqTdeeComponent;
  let fixture: ComponentFixture<KqTdeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KqTdeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KqTdeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
