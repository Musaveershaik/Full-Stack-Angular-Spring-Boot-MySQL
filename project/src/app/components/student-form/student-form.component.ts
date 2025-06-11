import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

interface DialogData {
  student: Student | null;
  mode: 'add' | 'edit';
}

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  template: `
    <div class="form-dialog">
      <!-- Header -->
      <div class="dialog-header">
        <div class="header-icon">
          <span class="header-icon-text">{{ mode === 'add' ? '➕' : '✏️' }}</span>
        </div>
        <div class="header-text">
          <h2 mat-dialog-title>{{ mode === 'add' ? 'Add New Student' : 'Edit Student' }}</h2>
          <p class="header-subtitle">{{ getSubtitle() }}</p>
        </div>
        <button class="close-button" mat-dialog-close>×</button>
      </div>

      <mat-divider></mat-divider>

      <!-- Form -->
      <form [formGroup]="studentForm" (ngSubmit)="onSubmit()" class="student-form">
        <div mat-dialog-content class="dialog-content">
          <div class="form-section">
            <h3 class="section-title">
              <span class="section-icon">👤</span>
              Personal Information
            </h3>
            
            <div class="form-fields">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Full Name</mat-label>
                <input matInput 
                       formControlName="name" 
                       placeholder="Enter student's full name"
                       maxlength="100">
                <mat-hint>Enter the student's complete name</mat-hint>
                <mat-error *ngIf="studentForm.get('name')?.hasError('required')">
                  Name is required
                </mat-error>
                <mat-error *ngIf="studentForm.get('name')?.hasError('minlength')">
                  Name must be at least 2 characters long
                </mat-error>
                <mat-error *ngIf="studentForm.get('name')?.hasError('pattern')">
                  Name can only contain letters and spaces
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Email Address</mat-label>
                <input matInput 
                       type="email"
                       formControlName="email" 
                       placeholder="student@example.com"
                       maxlength="100">
                <mat-hint>This will be used for communication</mat-hint>
                <mat-error *ngIf="studentForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="studentForm.get('email')?.hasError('email')">
                  Please enter a valid email address
                </mat-error>
              </mat-form-field>
            </div>
          </div>

          <!-- Student ID Info for Edit Mode -->
          <div *ngIf="mode === 'edit'" class="info-section">
            <div class="info-card">
              <span class="info-icon">ℹ️</span>
              <div class="info-content">
                <span class="info-label">Student ID</span>
                <span class="info-value">#{{ data.student?.id }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div mat-dialog-actions class="dialog-actions">
          <button class="cancel-button" 
                  type="button" 
                  mat-dialog-close
                  [disabled]="saving">
            Cancel
          </button>
          <button class="submit-button" 
                  type="submit"
                  [disabled]="studentForm.invalid || saving">
            <mat-spinner *ngIf="saving" diameter="20" class="button-spinner"></mat-spinner>
            {{ saving ? 'Saving...' : (mode === 'add' ? 'Add Student' : 'Update Student') }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-dialog {
      min-width: 480px;
      max-width: 600px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px 24px 16px 24px;
    }

    .header-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .header-icon-text {
      color: white;
      font-size: 24px;
    }

    .header-text {
      flex: 1;
    }

    .dialog-header h2 {
      margin: 0 0 4px 0;
      font-size: 24px;
      font-weight: 600;
      color: #1e293b;
      line-height: 1.2;
    }

    .header-subtitle {
      margin: 0;
      color: #64748b;
      font-size: 14px;
      font-weight: 500;
    }

    .close-button {
      background: none;
      border: none;
      color: #64748b;
      font-size: 24px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .close-button:hover {
      background-color: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .student-form {
      display: flex;
      flex-direction: column;
    }

    .dialog-content {
      padding: 24px;
      max-height: 60vh;
      overflow-y: auto;
    }

    .form-section {
      margin-bottom: 24px;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 20px 0;
      font-size: 16px;
      font-weight: 600;
      color: #374151;
    }

    .section-icon {
      font-size: 20px;
    }

    .form-fields {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .full-width {
      width: 100%;
    }

    .info-section {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
    }

    .info-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: linear-gradient(135deg, #f8fafc, #f1f5f9);
      border: 1px solid #e2e8f0;
      border-radius: 12px;
    }

    .info-icon {
      font-size: 20px;
    }

    .info-content {
      display: flex;
      flex-direction: column;
    }

    .info-label {
      font-size: 12px;
      color: #64748b;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .info-value {
      font-size: 16px;
      color: #1e293b;
      font-weight: 600;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding: 16px 24px 24px 24px;
      border-top: 1px solid #e5e7eb;
      background: #f8fafc;
    }

    .cancel-button,
    .submit-button {
      min-width: 120px;
      height: 44px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border-radius: 8px;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .cancel-button {
      background: white;
      border: 1px solid #d1d5db;
      color: #64748b;
    }

    .cancel-button:hover:not(:disabled) {
      background: #f8fafc;
      border-color: #9ca3af;
      color: #475569;
    }

    .submit-button {
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border: none;
      color: white;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .submit-button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
    }

    .submit-button:disabled {
      opacity: 0.6;
      transform: none;
      box-shadow: none;
      cursor: not-allowed;
    }

    .button-spinner {
      margin-right: 8px;
    }

    /* Form Field Customization */
    .mat-mdc-form-field {
      --mdc-outlined-text-field-container-shape: 12px;
    }

    .mat-mdc-form-field-hint,
    .mat-mdc-form-field-error {
      font-size: 12px;
    }

    /* Responsive Design */
    @media (max-width: 600px) {
      .form-dialog {
        min-width: 320px;
        max-width: 95vw;
      }
      
      .dialog-header {
        padding: 20px 16px 12px 16px;
      }
      
      .dialog-header h2 {
        font-size: 20px;
      }
      
      .header-icon {
        width: 40px;
        height: 40px;
      }
      
      .header-icon-text {
        font-size: 20px;
      }
      
      .dialog-content {
        padding: 16px;
      }
      
      .dialog-actions {
        padding: 12px 16px 20px 16px;
        flex-direction: column-reverse;
      }
      
      .cancel-button,
      .submit-button {
        width: 100%;
      }
    }
  `]
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  saving = false;
  mode: 'add' | 'edit';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.mode = data.mode;
    this.studentForm = this.createForm();
  }

  ngOnInit(): void {
    if (this.mode === 'edit' && this.data.student) {
      this.studentForm.patchValue(this.data.student);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]]
    });
  }

  getSubtitle(): string {
    return this.mode === 'add' 
      ? 'Fill in the details to add a new student to the system'
      : 'Update the student information below';
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.saving = true;
      const studentData: Student = { ...this.studentForm.value };
      delete studentData.id;

      const operation = this.mode === 'add' 
        ? this.studentService.createStudent(studentData)
        : this.studentService.updateStudent(this.data.student!.id!, studentData);

      operation.subscribe({
        next: (student) => {
          const message = this.mode === 'add' 
            ? 'Student added successfully' 
            : 'Student updated successfully';
          
          this.showSnackBar(message, 'success');
          this.dialogRef.close(student);
        },
        error: (error) => {
          this.showSnackBar(error, 'error');
          this.saving = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.studentForm.controls).forEach(key => {
      const control = this.studentForm.get(key);
      control?.markAsTouched();
    });
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