import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', loadComponent: () => import('./components/student-list/student-list.component').then(m => m.StudentListComponent) },
  { path: '**', redirectTo: '/students' }
];