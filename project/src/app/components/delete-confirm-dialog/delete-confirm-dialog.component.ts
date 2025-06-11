import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

interface DialogData {
  studentName: string;
}

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule
  ],
  template: `
    <div class="confirm-dialog">
      <!-- Header -->
      <div class="dialog-header">
        <div class="warning-icon">
          <span class="warning-icon-text">⚠️</span>
        </div>
        <div class="header-text">
          <h2 mat-dialog-title>Delete Student</h2>
          <p class="header-subtitle">This action cannot be undone</p>
        </div>
      </div>

      <mat-divider></mat-divider>

      <!-- Content -->
      <div mat-dialog-content class="dialog-content">
        <div class="warning-message">
          <div class="student-card">
            <div class="student-avatar">
              <span class="avatar-text">{{ getInitials(data.studentName) }}</span>
            </div>
            <div class="student-info">
              <span class="student-name">{{ data.studentName }}</span>
              <span class="student-label">Student Record</span>
            </div>
          </div>

          <div class="consequences">
            <div class="consequence-item">
              <span class="consequence-icon">🗑️</span>
              <span>All student data will be permanently removed</span>
            </div>
            <div class="consequence-item">
              <span class="consequence-icon">⏳</span>
              <span>This action cannot be reversed</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div mat-dialog-actions class="dialog-actions">
        <button class="cancel-button" mat-dialog-close>
          Keep Student
        </button>
        <button class="delete-button" [mat-dialog-close]="true">
          Delete Permanently
        </button>
      </div>
    </div>
  `,
  styles: [`
    .confirm-dialog {
      min-width: 360px;
      max-width: 400px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px 20px 12px 20px;
    }

    .warning-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #fef3c7, #fde68a);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .warning-icon-text {
      font-size: 20px;
    }

    .header-text {
      flex: 1;
      text-align: center;
    }

    .dialog-header h2 {
      margin: 0 0 4px 0;
      font-size: 20px;
      font-weight: 600;
      color: #1e293b;
      line-height: 1.2;
    }

    .header-subtitle {
      margin: 0;
      color: #ef4444;
      font-size: 13px;
      font-weight: 500;
    }

    .dialog-content {
      padding: 20px;
    }

    .warning-message {
      text-align: center;
    }

    .student-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: linear-gradient(135deg, #fef2f2, #fee2e2);
      border: 1px solid #fecaca;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .student-avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #fee2e2, #fecaca);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .avatar-text {
      color: #dc2626;
      font-size: 16px;
      font-weight: 600;
    }

    .student-info {
      display: flex;
      flex-direction: column;
      text-align: left;
    }

    .student-name {
      font-size: 16px;
      font-weight: 600;
      color: #1e293b;
      line-height: 1.2;
    }

    .student-label {
      font-size: 11px;
      color: #64748b;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .consequences {
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-align: left;
    }

    .consequence-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      background: rgba(239, 68, 68, 0.05);
      border-radius: 8px;
      font-size: 13px;
      color: #374151;
    }

    .consequence-icon {
      font-size: 16px;
      flex-shrink: 0;
    }

    .dialog-actions {
      display: flex;
      justify-content: center;
      gap: 10px;
      padding: 12px 20px 20px 20px;
      border-top: 1px solid #e5e7eb;
      background: #f8fafc;
    }

    .cancel-button,
    .delete-button {
      min-width: 120px;
      height: 40px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .cancel-button {
      background: white;
      border: 1px solid #d1d5db;
      color: #64748b;
    }

    .cancel-button:hover {
      background: #f1f5f9;
      border-color: #9ca3af;
      color: #374151;
    }

    .delete-button {
      background: linear-gradient(135deg, #ef4444, #dc2626);
      border: none;
      color: white;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
    }

    .delete-button:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
    }

    /* Responsive Design */
    @media (max-width: 480px) {
      .confirm-dialog {
        min-width: 280px;
        max-width: 95vw;
      }
      
      .dialog-header {
        padding: 16px 16px 8px 16px;
      }
      
      .dialog-header h2 {
        font-size: 18px;
      }
      
      .warning-icon {
        width: 36px;
        height: 36px;
      }
      
      .warning-icon-text {
        font-size: 18px;
      }
      
      .dialog-content {
        padding: 16px;
      }
      
      .student-card {
        padding: 12px;
      }
      
      .student-avatar {
        width: 36px;
        height: 36px;
      }
      
      .avatar-text {
        font-size: 14px;
      }
      
      .dialog-actions {
        padding: 12px 16px 16px 16px;
        flex-direction: column-reverse;
      }
      
      .cancel-button,
      .delete-button {
        width: 100%;
      }
    }
  `]
})
export class DeleteConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}