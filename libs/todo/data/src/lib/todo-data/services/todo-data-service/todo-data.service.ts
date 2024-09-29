import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';

import { TodoEntry } from '../../models/interfaces';
import { TodoHttpService } from '../../http/todo-http-service/todo-http.service';

@Injectable()
export class TodoDataService {
  protected _todoEntries: BehaviorSubject<TodoEntry[]> = new BehaviorSubject<
    TodoEntry[]
  >([]);

  constructor(protected _todoHttpService: TodoHttpService) {}

  public create(todo: TodoEntry): Observable<boolean> {
    if (todo.id) {
      return this.update(todo);
    }
    return this._todoHttpService.post(todo).pipe(
      tap((resp) => this._todoEntries.next([resp, ...this._todoEntries.value])),
      map(() => true),
      catchError(() => of(false))
    );
  }

  public update(todo: TodoEntry): Observable<boolean> {
    return this._todoHttpService.post(todo).pipe(
      tap((resp) => {
        const idx = this._todoEntries.value.findIndex((entry) => entry.id === resp.id);
        if (idx > 0) {
          this._todoEntries.value[idx] = todo;
          this._todoEntries.next([...this._todoEntries.value]);
        }
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  public remove(todo: TodoEntry): Observable<boolean> {
    return this._todoHttpService.delete(todo).pipe(
      tap(() =>
        this._todoEntries.next([
          ...this._todoEntries.value.filter(
            (entry) => entry.createdTimestamp !== todo.createdTimestamp
          ),
        ])
      ),
      map(() => true),
      catchError(() => of(false))
    );
  }

  public entries(): Observable<TodoEntry[]> {
    return this._todoEntries.asObservable();
  }
}
