
# Personal Finances App

A robust backend API for personal expense tracking, built with NestJS, Prisma, MongoDB, JWT authentication, and Jest for testing. Includes endpoints for users, transactions, categories, budgets, balance calculations, budget tracking, and chart data. Swagger is integrated for API exploration.

## Technologies Used
- Node.js
- NestJS
- Prisma ORM
- MongoDB
- JWT (JSON Web Tokens)
- Jest
- Swagger (OpenAPI)
- class-validator
- TypeScript

## Programming Fundamentals
- Modular architecture: Each domain (user, transaction, category, budget, auth) is its own module.
- Dependency injection for testability and maintainability.
- DTOs and validation for type safety and input checking.
- Consistent error handling with NestJS exception filters.
- Jest for unit and integration testing.
- Swagger for auto-generated API docs.

## Setup Instructions
1. Install dependencies:
  ```bash
  npm install
  ```
2. Configure `.env` with your MongoDB connection string and JWT secret.
3. Generate Prisma client and push schema:
  ```bash
  npx prisma generate
  npx prisma db push
  ```
4. Run the app:
  ```bash
  npm run start:dev
  ```
5. Access Swagger docs at [http://localhost:3000/api](http://localhost:3000/api)

## Main Endpoints
- `/auth/register` — Register a new user
- `/auth/login` — Login and receive JWT
- `/user` — CRUD for users
- `/category` — CRUD for categories
- `/budget` — CRUD for budgets
- `/budget/tracking/:userId` — Budget tracking for a user
- `/transaction` — CRUD for transactions
- `/transaction/balance/:userId` — User balance, income, expense
- `/transaction/spending-by-category/:userId` — Spending by category (for charts)

## By Me
**English:**
This project was created by me as a robust foundation for personal finance management. It demonstrates best practices in backend development, modular design, and API documentation.

**Español:**
Este proyecto fue creado por mi como una base sólida para la gestión de finanzas personales. Demuestra buenas prácticas en desarrollo backend, diseño modular y documentación de APIs.
# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
