import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerateUpdateAccountComponent } from './cerate-update-account.component';

describe('CerateUpdateAccountComponent', () => {
  let component: CerateUpdateAccountComponent;
  let fixture: ComponentFixture<CerateUpdateAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CerateUpdateAccountComponent]
    });
    fixture = TestBed.createComponent(CerateUpdateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
