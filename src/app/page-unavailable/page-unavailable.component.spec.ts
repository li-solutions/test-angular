import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUnavailableComponent } from './page-unavailable.component';

describe('PageUnavailableComponent', () => {
  let component: PageUnavailableComponent;
  let fixture: ComponentFixture<PageUnavailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageUnavailableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
