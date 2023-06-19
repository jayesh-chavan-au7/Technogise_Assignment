# Technogise_Assignment

## Book Library

This repository contains a book library application developed as part of a Technogise assignment. The application allows users to manage books in a library.

### Assumptions

1. **Data Storage**: The application does not utilize a database to store the data. Instead, it uses a static list to store the book data. The Node.js filesystem module is employed to read from and write to a JSON file.

2. **Application Flexibility**: The application is designed as a generic console application with a repository pattern. It can be easily extended to be used as a web application.

### Build Process

1. **TypeScript**: The application is built using TypeScript to leverage the benefits of type checking and intellisense.

2. **Dependency Injection**: Tysyringe is used for dependency injection, enabling efficient management of dependencies within the application.

3. **Unit Testing**: Jest is utilized for unit testing purposes, ensuring the reliability and correctness of the application.

4. **Test-Driven Development**: The application is developed following the Test-Driven Development (TDD) approach, where tests are written before the actual implementation.

5. **SOLID Principles**: The application aims to incorporate SOLID principles, promoting modular and maintainable code. Additionally, the KISS (Keep It Simple, Stupid) and DRY (Don't Repeat Yourself) principles are followed.

6. **Code Formatting**: Prettier is employed for code formatting, ensuring consistent and readable code.

### Running the Application

To run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Run `npm install` to install the necessary dependencies.
3. Execute `npm run build` to build the application.
4. Launch the application by running `npm run start`.
5. Run `npm run test` to execute the unit tests and verify the functionality of the application.
