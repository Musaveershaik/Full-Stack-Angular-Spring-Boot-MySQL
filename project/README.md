# Student Management System - Angular Frontend

A modern, responsive Angular frontend application for managing student records, designed to work seamlessly with a Spring Boot backend.

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, and Delete student records
- **Real-time Search**: Filter students by name or email
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Built with Angular Material for a professional look
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Visual feedback during API operations
- **Form Validation**: Client-side validation for data integrity
- **Confirmation Dialogs**: Safe deletion with confirmation prompts
- **Connection Status**: Real-time backend connection monitoring

## 🛠 Technology Stack

### Frontend
- **Angular 19** - Latest Angular framework
- **Angular Material** - Google's Material Design components
- **RxJS** - Reactive programming with observables
- **TypeScript** - Type-safe JavaScript development
- **Responsive CSS** - Mobile-first design approach

### Backend Integration
- **Spring Boot 3.5.0** - REST API backend
- **MySQL Database** - Persistent data storage
- **HTTP Client** - RESTful API communication
- **CORS Support** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, ensure you have:

1. **Node.js** (version 18 or higher)
2. **npm** (comes with Node.js)
3. **Angular CLI** (optional, for additional commands)
4. **Spring Boot backend** running on `http://localhost:8080`

## 🔧 Installation & Setup

### Step 1: Clone or Download the Project
```bash
# If using Git
git clone <your-repository-url>
cd student-management-frontend

# Or download and extract the project files
```

### Step 2: Install Dependencies
```bash
# Install all required npm packages
npm install
```

### Step 3: Verify Angular CLI (Optional)
```bash
# Install Angular CLI globally if not already installed
npm install -g @angular/cli

# Verify installation
ng version
```

### Step 4: Start the Development Server
```bash
# Start the Angular development server
npm start

# Alternative using Angular CLI
ng serve
```

The application will be available at `http://localhost:4200`

## 🎯 Backend Requirements

Ensure your Spring Boot backend is running with the following configuration:

### Backend Endpoints
```
Base URL: http://localhost:8080

GET    /              - Welcome message
GET    /students      - Get all students
GET    /students/{id} - Get student by ID
POST   /students      - Create new student
PUT    /students/{id} - Update student
DELETE /students/{id} - Delete student
```

### Student Data Model
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@email.com"
}
```

### CORS Configuration
Add this to your Spring Boot application:

```java
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class StudentController {
    // Your controller methods
}
```

Or configure globally:
```java
@Configuration
public class CorsConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── student-list/           # Main student listing component
│   │   ├── student-form/           # Add/Edit student form
│   │   └── delete-confirm-dialog/  # Delete confirmation dialog
│   ├── models/
│   │   └── student.model.ts        # Student interface and types
│   ├── services/
│   │   └── student.service.ts      # HTTP service for API calls
│   └── app.routes.ts              # Application routing
├── global_styles.css              # Global styles and Material theme
├── index.html                     # Main HTML template
└── main.ts                        # Application bootstrap
```

## 🔍 Component Overview

### StudentListComponent
- Displays all students in a responsive table
- Search functionality for filtering
- Add, edit, and delete operations
- Connection status monitoring
- Loading states and error handling

### StudentFormComponent
- Reusable form for adding and editing students
- Reactive forms with validation
- Real-time form validation feedback
- Modal dialog interface

### DeleteConfirmDialogComponent
- Confirmation dialog for delete operations
- Prevents accidental deletions
- Clean, user-friendly interface

### StudentService
- Centralized HTTP service for all API calls
- Error handling and retry logic
- Type-safe methods for CRUD operations

## 🎨 UI/UX Features

- **Material Design**: Consistent, modern interface
- **Responsive Layout**: Works on all screen sizes
- **Loading Indicators**: Visual feedback during operations
- **Error Messages**: Clear error communication
- **Success Notifications**: Confirmation of successful operations
- **Form Validation**: Real-time input validation
- **Empty States**: Helpful messages when no data exists

## 🚦 Running the Application

### Development Mode
```bash
npm start
# Application runs on http://localhost:4200
# Automatically reloads when files change
```

### Production Build
```bash
npm run build
# Creates optimized build in dist/ folder
```

### Running Tests (if configured)
```bash
ng test
# Runs unit tests using Karma and Jasmine
```

## 🔧 Configuration

### API URL Configuration
The API base URL is configured in `src/app/services/student.service.ts`:

```typescript
private readonly API_URL = 'http://localhost:8080';
```

To change the backend URL, modify this constant.

### Angular Material Theme
The Material theme is configured in `src/global_styles.css`:

```css
@import '@angular/material/prebuilt-themes/azure-blue.css';
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure CORS is properly configured in your Spring Boot backend
   - Check that the frontend URL is allowed in CORS origins

2. **Connection Refused**
   - Verify Spring Boot backend is running on port 8080
   - Check firewall settings

3. **Port Already in Use**
   ```bash
   # Start on a different port
   ng serve --port 4201
   ```

4. **Node Modules Issues**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Debug Mode
Enable detailed logging by opening browser developer tools (F12) and checking the Console tab for detailed error messages.

## 📱 Mobile Support

The application is fully responsive and includes:
- Mobile-optimized layouts
- Touch-friendly buttons and inputs
- Responsive tables that adapt to small screens
- Mobile-first design approach

## 🔐 Security Considerations

- Input validation on both client and server sides
- CORS properly configured for production
- No sensitive data stored in frontend
- HTTP-only communication (upgrade to HTTPS in production)

## 🚀 Deployment

### Development Environment
- Frontend: `http://localhost:4200`
- Backend: `http://localhost:8080`

### Production Deployment
1. Build the application: `npm run build`
2. Deploy the `dist/` folder to your web server
3. Configure your backend for production CORS settings
4. Update API URLs for production environment

## 📞 Support

For issues or questions:
1. Check the browser console for error messages
2. Verify backend is running and accessible
3. Check network connectivity
4. Review CORS configuration

## 🎓 Learning Resources

This project demonstrates:
- Angular 19 standalone components
- Angular Material UI components
- Reactive forms and validation
- HTTP client usage
- RxJS observables
- TypeScript best practices
- Responsive web design
- REST API integration

Perfect for showcasing full-stack development skills in interviews and portfolios!