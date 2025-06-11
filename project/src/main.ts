import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { StudentListComponent } from './app/components/student-list/student-list.component';
import { routes } from './app/app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    StudentListComponent
  ],
  template: `
    <div class="app-container">
      <!-- Minimalist Header -->
      <header class="app-header">
        <div class="header-content">
          <div class="brand">
            <div class="brand-icon">
              <mat-icon>SH</mat-icon>
            </div>
            <div class="brand-info">
              <h1 class="brand-title">StudyHub</h1>
              <span class="brand-subtitle">Student Management</span>
            </div>
          </div>
          <div class="header-actions">
            <div class="connection-indicator" [class]="connectionClass">
              <span class="connection-text">{{ connectionText }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content fade-in">
        <app-student-list></app-student-list>
      </main>

      <!-- Minimalist Footer -->
      <footer class="app-footer">
        <div class="footer-content">
          <div class="footer-items">
            <div class="footer-item">
              <span class="item-icon">💻</span>
              <span>Angular {{ angularVersion }} + Spring Boot</span>
            </div>
            <div class="footer-divider">•</div>
            <div class="footer-item">
              <span class="item-icon">💾</span>
              <span>MySQL Database</span>
            </div>
            <div class="footer-divider">•</div>
            <div class="footer-item">
              <span class="item-icon">🔌</span>
              <span>REST API</span>
            </div>
            <div class="footer-divider">•</div>
            <div class="footer-item">
              <span class="item-icon">©</span>
              <span>2024 StudyHub. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    }

    .app-header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(226, 232, 240, 0.8);
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 0;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .brand-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #3b82f6, #1d4ed8);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .brand-icon mat-icon {
      color: white;
      font-size: 18px;
    }

    .brand-info {
      display: flex;
      flex-direction: column;
    }

    .brand-title {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      line-height: 1.2;
    }

    .brand-subtitle {
      font-size: 14px;
      color: #64748b;
      font-weight: 500;
    }

    .header-actions {
      display: flex;
      align-items: center;
    }

    .connection-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .connection-connected {
      background: rgba(16, 185, 129, 0.1);
      color: #059669;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    .connection-disconnected {
      background: rgba(239, 68, 68, 0.1);
      color: #dc2626;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .connection-checking {
      background: rgba(245, 158, 11, 0.1);
      color: #d97706;
      border: 1px solid rgba(245, 158, 11, 0.2);
    }

    .connection-icon {
      font-size: 10px;
      width: 18px;
      height: 18px;
    }

    .main-content {
      flex: 1;
      padding: 0;
    }

    .app-footer {
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 12px 24px;
      margin-top: auto;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .footer-items {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 8px;
    }

    .footer-item {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #64748b;
      font-size: 13px;
      white-space: nowrap;
    }

    .item-icon {
      font-size: 14px;
    }

    .footer-divider {
      color: #cbd5e1;
      font-size: 12px;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .header-content {
        padding: 12px 16px;
      }

      .brand-title {
        font-size: 20px;
      }

      .brand-subtitle {
        font-size: 12px;
      }

      .connection-text {
        display: none;
      }

      .footer-items {
        flex-direction: column;
        gap: 4px;
      }

      .footer-divider {
        display: none;
      }
    }

    @media (max-width: 480px) {
      .brand-info {
        display: none;
      }

      .brand-icon {
        width: 40px;
        height: 40px;
      }

      .brand-icon mat-icon {
        font-size: 20px;
      }

      .footer-items {
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .app-footer {
        padding: 12px 16px;
      }
    }
  `]
})
export class App {
  angularVersion = '19';
  connectionClass = 'connection-checking';
  connectionIcon = 'sync';
  connectionText = 'Connecting...';

  ngOnInit() {
    // Simulate connection check
    setTimeout(() => {
      this.connectionClass = 'connection-connected';
      this.connectionIcon = 'check_circle';
      this.connectionText = 'Connected';
    }, 2000);
  }
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    importProvidersFrom()
  ]
}).catch(err => console.error(err));