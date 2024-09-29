import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TodoDataService, TodoEntry, TodoHttpService } from '@todo/todo-data';

// Create resuable input component...

@Component({
  selector: 'lib-todo-create-todo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [TodoDataService, TodoHttpService],
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.css',
})
export class CreateTodoComponent {
  get title() {
    return this.formGroup.controls['title'];
  }

  get note() {
    return this.formGroup.controls['note'];
  }

  @Input() public submitActive = false;
  @Input() public set todoUpdate(todo: TodoEntry | undefined) {
    this._todoUpdate = todo;
    if (todo) {
      this.title.setValue(todo.title);
      this.note.setValue(todo.note);
    }
  }
  get todoUpdate(): TodoEntry | undefined {
    return this._todoUpdate;
  }
  @Output() public createTodoEvent: EventEmitter<TodoEntry> =
    new EventEmitter<TodoEntry>();

  protected _todoUpdate?: TodoEntry;

  public formGroup = new FormGroup({
    title: new FormControl<string | undefined>(
      { disabled: false, value: undefined },
      [Validators.required]
    ),
    note: new FormControl<string | undefined>({
      disabled: false,
      value: undefined,
    }),
  });

  // Add use messaging to support invalid inputs
  // Focus on invalid input on submisson
  public onClickSubmit() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
    }

    this.createTodoEvent.emit({
      title: this.title.value as string,
      note: this.note.value as string,
      createdTimestamp: Date.now(),
      completed: false,
      ...(this.todoUpdate && {
        createdTimestamp: this.todoUpdate.createdTimestamp,
        completed: this.todoUpdate.completed,
        id: this.todoUpdate.id,
      }),
    });

    this.formGroup.reset();
  }
}
