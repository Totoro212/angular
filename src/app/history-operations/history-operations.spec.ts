import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryOperations } from './history-operations';

describe('HistoryOperations', () => {
  let component: HistoryOperations;
  let fixture: ComponentFixture<HistoryOperations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryOperations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryOperations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
