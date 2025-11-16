# SaaS Accounting & Inventory Management System

This is a clean, modular, and scalable SaaS Accounting & Inventory Management System built with Node.js, TypeScript, Express, Prisma, and PostgreSQL.

## Features

- **Multi-tenancy:** Shared-database multi-tenancy with a `tenantId` column on every table.
- **Authentication:** JWT-based authentication with access and refresh tokens using the `RS256` algorithm.
- **Layered Architecture:** Clean separation of concerns with a Controller → Service → Repository architecture.
- **Transactional Logic:** Transactional invoice creation with stock adjustments and idempotency key support.
- **API Documentation:** OpenAPI/Swagger documentation for all API endpoints.
- **Containerization:** Dockerized application with a `docker-compose.yml` file for easy setup.
- **CI/CD:** GitHub Actions workflow for continuous integration and deployment.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file from the `.env.example` file and fill in the required environment variables.
5.  Start the database and Redis services:
    ```bash
    docker-compose up -d db redis
    ```
6.  Run the database migrations:
    ```bash
    npx prisma migrate dev
    ```
7.  Seed the database with demo data:
    ```bash
    npm run seed
    ```
8.  Start the application:
    ```bash
    npm run dev
    ```

The application will be running at `http://localhost:3000`.

## Tenancy Model

This application uses a shared-database multi-tenancy model. Each tenant's data is isolated by a `tenantId` column on every table. The `tenantId` is extracted from the JWT payload for every request, and a Prisma middleware is used to automatically scope all database queries to the current tenant.

## API Usage

The API is documented using OpenAPI/Swagger. You can access the documentation at `http://localhost:3000/api-docs`.

## Environment Variables

The following environment variables are required to run the application:

- `DATABASE_URL`: The connection string for the PostgreSQL database.
- `REDIS_URL`: The connection string for the Redis server.
- `JWT_PRIVATE_KEY`: The private key for signing JWTs.
- `JWT_PUBLIC_KEY`: The public key for verifying JWTs.
- `PORT`: The port to run the application on.
