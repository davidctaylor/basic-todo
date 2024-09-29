import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, finalize } from 'rxjs';

import { CardComponent } from '@todo/shared-ui';
import { TodoDataService, TodoEntry, TodoHttpService } from '@todo/todo-data';
import { HeaderComponent } from '../header/header.component';
import { CreateTodoComponent } from '../create-todo/create-todo.component';

@Component({
  selector: 'lib-todo-feature-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CardComponent, CreateTodoComponent],
  providers: [TodoDataService, TodoHttpService],
  templateUrl: './todo-feature-home.component.html',
  styleUrl: './todo-feature-home.component.css',
})
export class TodoFeatureHomeComponent {
  public todos$: Observable<TodoEntry[]>;
  public todoCreateActive = false;
  public todoUpdate?: TodoEntry;

  constructor(protected _todoDataService: TodoDataService) {
    this.todos$ = this._todoDataService.entries();
  }

  // TODO error handling ans user messaging
  public onCreateTodoEvent(todo: TodoEntry) {
    this.todoCreateActive = true;
    this._todoDataService
      .create(todo)
      .pipe(finalize(() => {
        this.todoCreateActive = false;
        this.todoUpdate = undefined;
      }))
      .subscribe();
  }

  public onClickRemove(todo: TodoEntry) {
    this._todoDataService.remove(todo).subscribe();
  }

  public onClickUpdate(todo: TodoEntry) {
    this.todoUpdate = todo;
  }
}
