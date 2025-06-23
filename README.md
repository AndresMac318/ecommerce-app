# 🛒 Ecommerce App v1.0 – Angular 19 + Hexagonal Architecture + Docker Compose

A modern, scalable and professional ecommerce frontend built with Angular v19.  
Developed as part of my learning journey to explore advanced frontend architectures and deployment workflows.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.0.

## 🚀 Tech Stack

- **Angular v19** with standalone components
- **Hexagonal Architecture** (frontend/client-server approach)
- **NgRx** for global state management
- **Signals**, `computed`, and `effects` for fine-grained reactivity
- **Testing** with Jasmine and Karma
- **Angular Material** UI components
- **SCSS (BEM)** for responsive design (Mobile-first)
- **ngx-translate** for i18n support
- **Dark Mode** toggle
- **json-server** for mocking backend
- **Docker & Docker Compose** for containerization and easy deployment
- **Node.js + Nginx** setup for production builds

## 📦 Features

- 🔐 User authentication (login & register)
- 🛍️ Product listing and purchase simulation
- 🌗 Dark mode
- 🌍 Multilingual support
- 📱 Mobile-first responsive design
- ⚙️ Ready for production with Docker Compose
- ♻️ Optimized change detection (OnPush)

## 📁 Architecture

This app uses a **Hexagonal Architecture** on the frontend to separate business logic from framework-specific details. This structure ensures:
- Better testability
- Maintainability and scalability
- Reusability of business logic

## 🧠 State Management

- **NgRx** for predictable and testable global state
- **Signals** for lightweight reactivity
- **Product caching** and optimized rendering

## 🐳 Deployment with Docker Compose

In the root of the project run the command:

```bash
docker compose up --build
```
### You should have the ports 80 and 3000 free !

Once the server is running, visit the frontend opening your browser and navigate to `http://localhost:80/`.

Visit the backend in `http://localhost:3000/`.

## Development server

To start a local development server, run:

### In frontend: 
```bash
ng serve
```

### In backend
Install json-server globally:
```bash
npm install -g json-server 
```

Then, run:
```bash
npx json-server server/db.json --port 3000
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Tests Performed

#### [Product Feature] product-usecase
* should handle error when getProductById fails
* should return product by ID
* should return all products when getProducts is successful
* should return paginated products correctly
* should handle error when getProducts fails
#### [Auth Feature] auth-usecase
* should return a user when login is successful
* should return true when user is logged in
* should call logout from authAPIService
* should return an error when signup fails
* should return a user when signup is successful
* should return false when user is not logged in
* should return an error when login fails
#### [User Feature] User Service
* should return error if email already exists in another user
* should update profile if email is unique
* should update user cart with patch
* should fetch user cart
* should throw error if userId is not in localStorage
* should fetch current user if userId is in localStorage
##### [Buy Feature] buy-usecase
* should return error when getBuyById fails
* should return a sale when registerBuy is successful
* should return a sale when getBuyById is successful
* should return error when getBuysByClient fails
* should return error when registerBuy fails
* should return sales when getBuysByClient is successful

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
