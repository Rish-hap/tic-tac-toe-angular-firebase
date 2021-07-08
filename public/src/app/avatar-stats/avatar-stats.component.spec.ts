import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarStatsComponent } from './avatar-stats.component';

describe('AvatarStatsComponent', () => {
  let component: AvatarStatsComponent;
  let fixture: ComponentFixture<AvatarStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvatarStatsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
