import { Route } from '@angular/router';
export const appRoutes: Route[] = [
  {
    path: 'todo',
    loadComponent: () =>
      import('@todo/todo-feature-home').then((m) => m.TodoFeatureHomeComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todo'
  },
];
