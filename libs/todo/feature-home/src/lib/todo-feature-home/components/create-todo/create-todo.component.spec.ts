import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTodoComponent } from './create-todo.component';

describe('TodoFeatureHomeComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTodoComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTodoComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
