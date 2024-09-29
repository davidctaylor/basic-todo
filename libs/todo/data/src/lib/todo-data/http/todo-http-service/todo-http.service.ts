import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TodoEntry } from '../../models/interfaces';

@Injectable()
export class TodoHttpService {

  public post(todo: TodoEntry): Observable<TodoEntry>  {
    if (!todo.id) {
      todo.id = Date.now();
    }
    return of(todo);
  }

  public delete(todo: TodoEntry): Observable<TodoEntry>  {
    return of(todo);
  }
}
