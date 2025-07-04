# Full Stack CRUD Application

This is a full-stack CRUD (Create, Read, Update, Delete) application built with Angular (frontend) and Spring Boot (backend). The application demonstrates a complete implementation of CRUD operations using JPA Repository and MySQL database.

## Project Preview

![image](https://github.com/user-attachments/assets/50036d51-c5c2-405f-8d71-2733ffea94ba)

## Project Structure

The project is divided into two main parts:
- **Frontend**: Located in the `project` directory, built with Angular
- **Backend**: Located in a separate repository at [https://github.com/Musaveershaik/Java-Spring-Boot](https://github.com/Musaveershaik/Java-Spring-Boot)

## Features

### Backend (Spring Boot)
- RESTful API implementation
- CRUD operations using JPA Repository
- MySQL database integration
- Entity relationships and data modeling
- RESTful endpoints for all CRUD operations

### Frontend (Angular)
- Modern and responsive user interface
- Form validation
- Data display and manipulation
- HTTP service integration with backend
- Component-based architecture

## Prerequisites

Before running this project, make sure you have the following installed:
- Java JDK 17 or higher
- Node.js and npm
- MySQL Server
- Angular CLI
- Maven

## Setup Instructions

### Backend Setup

1. Clone the backend repository:
```bash
git clone https://github.com/Musaveershaik/Java-Spring-Boot
cd Java-Spring-Boot
```

2. Configure MySQL:
   - Create a new database named `crud_db`
   - Update the `application.properties` file with your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/crud_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Run the Spring Boot application:
```bash
./mvnw spring-boot:run
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Start the Angular development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## API Endpoints

The backend provides the following REST endpoints:

- `GET /api/items` - Get all items
- `GET /api/items/{id}` - Get item by ID
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update existing item
- `DELETE /api/items/{id}` - Delete item

## Project Screenshots

[Add your project screenshots here]

## Technologies Used

### Backend
- Spring Boot
- Spring Data JPA
- MySQL
- Maven

### Frontend
- Angular
- TypeScript
- HTML5
- CSS3
- Bootstrap

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Contact

Shaik Mohammad Musaveer - musaveershaikh43@gmail.com

Project Links:
- Frontend: [https://github.com/Musaveershaik/Full-Stack-Angular-Spring-Boot-MySQL](https://github.com/Musaveershaik/Full-Stack-Angular-Spring-Boot-MySQL)
- Backend: [https://github.com/Musaveershaik/Java-Spring-Boot](https://github.com/Musaveershaik/Java-Spring-Boot) 
