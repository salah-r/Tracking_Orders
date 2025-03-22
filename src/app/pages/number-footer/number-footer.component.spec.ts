import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberFooterComponent } from './number-footer.component';

describe('NumberFooterComponent', () => {
  let component: NumberFooterComponent;
  let fixture: ComponentFixture<NumberFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberFooterComponent]
    });
    fixture = TestBed.createComponent(NumberFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
