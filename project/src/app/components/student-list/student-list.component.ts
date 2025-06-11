import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';

import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    FormsModule
  ],
  template: `
    <div class="student-container">
      <!-- Hero Section -->
      <section class="hero-section slide-up">
        <div class="hero-content">
          <div class="hero-text">
            <h2 class="hero-title">Student Directory</h2>
            <p class="hero-subtitle">Manage and organize your student records with ease</p>
            <div class="stats-chips">
              <mat-chip-set>
                <mat-chip class="stat-chip">
                  {{ students.length }} Students
                </mat-chip>
                <mat-chip class="stat-chip" *ngIf="searchTerm">
                  {{ filteredStudents.length }} Results
                </mat-chip>
              </mat-chip-set>
            </div>
          </div>
          <div class="hero-actions">
            <button class="add-button" (click)="openAddDialog()">
              Add Student
            </button>
          </div>
        </div>
      </section>

      <!-- Search & Controls -->
      <mat-card class="controls-card glass-card fade-in">
        <div class="controls-content">
          <div class="search-section">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search students</mat-label>
              <input matInput [(ngModel)]="searchTerm" (ngModelChange)="applyFilter()" 
                     placeholder="Type name or email...">
              <button matSuffix class="clear-button" *ngIf="searchTerm" (click)="clearSearch()">×</button>
            </mat-form-field>
          </div>
          <div class="action-buttons">
            <button class="refresh-button" (click)="refreshStudents()" [disabled]="loading">
              Refresh
            </button>
          </div>
        </div>
      </mat-card>

      <!-- Loading State -->
      <div *ngIf="loading" class="loading-container fade-in">
        <mat-spinner diameter="60" color="primary"></mat-spinner>
        <p class="loading-text">Loading students...</p>
      </div>

      <!-- Students Grid -->
      <div *ngIf="!loading && filteredStudents.length > 0" class="students-grid fade-in">
        <mat-card *ngFor="let student of filteredStudents; trackBy: trackByStudentId" 
                  class="student-card glass-card">
          <div class="student-header">
            <div class="student-avatar">
              <span class="avatar-text">{{ getInitials(student.name) }}</span>
            </div>
            <div class="student-info">
              <h3 class="student-name">{{ student.name }}</h3>
              <p class="student-email">
                <a [href]="'mailto:' + student.email">{{ student.email }}</a>
              </p>
            </div>
            <div class="student-id">
              <span class="id-badge">#{{ student.id }}</span>
            </div>
          </div>
          <div class="student-actions">
            <button class="action-button edit" (click)="openEditDialog(student)">
              Edit
            </button>
            <button class="action-button delete" (click)="confirmDelete(student)">
              Delete
            </button>
          </div>
        </mat-card>
      </div>

      <!-- Empty State -->
      <mat-card *ngIf="!loading && filteredStudents.length === 0" class="empty-state glass-card fade-in">
        <div class="empty-content">
          <div class="empty-icon">
            <span class="empty-icon-text">{{ getEmptyStateIcon() }}</span>
          </div>
          <h3 class="empty-title">{{ getEmptyStateTitle() }}</h3>
          <p class="empty-message">{{ getEmptyStateMessage() }}</p>
          <div class="empty-actions">
            <button *ngIf="!searchTerm && students.length === 0" 
                    class="primary-button" (click)="openAddDialog()">
              Add Your First Student
            </button>
            <button *ngIf="searchTerm" 
                    class="secondary-button" (click)="clearSearch()">
              Clear Search
            </button>
          </div>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .student-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    .hero-section {
      margin-bottom: 32px;
    }

    .hero-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
    }

    .hero-text {
      flex: 1;
    }

    .hero-title {
      margin: 0 0 12px 0;
      font-size: 32px;
      font-weight: 700;
      color: #1e293b;
      line-height: 1.2;
    }

    .hero-subtitle {
      margin: 0 0 20px 0;
      font-size: 18px;
      color: #64748b;
      font-weight: 400;
    }

    .stats-chips {
      margin-top: 16px;
    }

    .stat-chip {
      background: rgba(59, 130, 246, 0.1) !important;
      color: #1e40af !important;
      font-weight: 500 !important;
    }

    .add-button {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }

    .add-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
    }

    .controls-card {
      margin-bottom: 32px;
      padding: 24px;
    }

    .controls-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
    }

    .search-section {
      flex: 1;
      max-width: 400px;
    }

    .search-field {
      width: 100%;
    }

    .clear-button {
      background: none;
      border: none;
      color: #64748b;
      font-size: 20px;
      cursor: pointer;
      padding: 0 8px;
      transition: color 0.2s ease;
    }

    .clear-button:hover {
      color: #ef4444;
    }

    .refresh-button {
      background: white;
      border: 1px solid #e2e8f0;
      color: #64748b;
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .refresh-button:hover:not(:disabled) {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #475569;
    }

    .refresh-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .students-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }

    .student-card {
      padding: 24px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .student-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12) !important;
    }

    .student-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 20px;
    }

    .student-avatar {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .avatar-text {
      color: #4f46e5;
      font-size: 18px;
      font-weight: 600;
    }

    .student-info {
      flex: 1;
      min-width: 0;
    }

    .student-name {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      line-height: 1.3;
    }

    .student-email {
      margin: 0;
      color: #64748b;
      font-size: 14px;
    }

    .student-email a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }

    .student-email a:hover {
      text-decoration: underline;
    }

    .student-id {
      flex-shrink: 0;
    }

    .id-badge {
      background: rgba(100, 116, 139, 0.1);
      color: #475569;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .student-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid rgba(226, 232, 240, 0.8);
    }

    .action-button {
      padding: 8px 16px;
      border-radius: 8px;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
    }

    .action-button.edit {
      background: #f1f5f9;
      color: #475569;
    }

    .action-button.edit:hover {
      background: #e2e8f0;
      color: #1e293b;
    }

    .action-button.delete {
      background: #fee2e2;
      color: #dc2626;
    }

    .action-button.delete:hover {
      background: #fecaca;
      color: #b91c1c;
    }

    .empty-state {
      padding: 60px 40px;
      text-align: center;
    }

    .empty-content {
      max-width: 400px;
      margin: 0 auto;
    }

    .empty-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px auto;
    }

    .empty-icon-text {
      font-size: 32px;
      color: #94a3b8;
    }

    .empty-title {
      margin: 0 0 12px 0;
      font-size: 24px;
      font-weight: 600;
      color: #374151;
    }

    .empty-message {
      margin: 0 0 32px 0;
      color: #6b7280;
      font-size: 16px;
      line-height: 1.6;
    }

    .empty-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
    }

    .primary-button {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
    }

    .primary-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(59, 130, 246, 0.4);
    }

    .secondary-button {
      background: white;
      border: 1px solid #e2e8f0;
      color: #64748b;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 500;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .secondary-button:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      color: #475569;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .student-container {
        padding: 24px 16px;
      }

      .hero-content {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
        gap: 24px;
      }

      .hero-title {
        font-size: 28px;
      }

      .hero-subtitle {
        font-size: 16px;
      }

      .controls-content {
        flex-direction: column;
        align-items: stretch;
        gap: 16px;
      }

      .search-section {
        max-width: none;
      }

      .action-buttons {
        justify-content: center;
      }

      .students-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .student-card {
        padding: 20px;
      }

      .empty-state {
        padding: 40px 20px;
      }
    }

    @media (max-width: 480px) {
      .hero-title {
        font-size: 24px;
      }

      .student-header {
        gap: 12px;
      }

      .student-avatar {
        width: 40px;
        height: 40px;
      }

      .avatar-text {
        font-size: 16px;
      }

      .student-name {
        font-size: 16px;
      }

      .student-actions {
        justify-content: center;
      }
    }
  `]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  loading = false;
  searchTerm = '';

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  trackByStudentId(index: number, student: Student): number {
    return student.id || index;
  }

  loadStudents(): void {
    this.loading = true;
    this.studentService.getAllStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.applyFilter();
        this.loading = false;
      },
      error: (error) => {
        this.showSnackBar(error, 'error');
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    if (!this.searchTerm.trim()) {
      this.filteredStudents = [...this.students];
    } else {
      const term = this.searchTerm.toLowerCase().trim();
      this.filteredStudents = this.students.filter(student =>
        student.name.toLowerCase().includes(term) ||
        student.email.toLowerCase().includes(term)
      );
    }
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilter();
  }

  refreshStudents(): void {
    this.loadStudents();
    this.showSnackBar('Students refreshed successfully', 'success');
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: { student: null, mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents();
      }
    });
  }

  openEditDialog(student: Student): void {
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: { student: { ...student }, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents();
      }
    });
  }

  confirmDelete(student: Student): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      maxWidth: '90vw',
      data: { studentName: student.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && student.id) {
        this.deleteStudent(student.id);
      }
    });
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.showSnackBar('Student deleted successfully', 'success');
        this.loadStudents();
      },
      error: (error) => {
        this.showSnackBar(error, 'error');
      }
    });
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getEmptyStateIcon(): string {
    return this.searchTerm ? '🔍' : '📚';
  }

  getEmptyStateTitle(): string {
    return this.searchTerm ? 'No Results Found' : 'No Students Yet';
  }

  getEmptyStateMessage(): string {
    return this.searchTerm 
      ? 'Try adjusting your search terms or clear the search to see all students.'
      : 'Start building your student directory by adding your first student record.';
  }

  private showSnackBar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}