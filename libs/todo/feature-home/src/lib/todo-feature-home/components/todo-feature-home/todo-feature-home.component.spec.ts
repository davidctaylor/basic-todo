import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoFeatureHomeComponent } from './todo-feature-home.component';

describe('TodoFeatureHomeComponent', () => {
  let component: TodoFeatureHomeComponent;
  let fixture: ComponentFixture<TodoFeatureHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFeatureHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFeatureHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
