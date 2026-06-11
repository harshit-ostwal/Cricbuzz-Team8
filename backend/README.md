# Cric Buzz

Cricbuzz Cricket Statistics Backend API built with Node.js and Express.

## Getting Started

### 1. Create a new project
```sh
bunx backend-starter <your-project-name>
```

### 2. Install dependencies
```sh
cd <your-project-name>
# Use your chosen package manager (Bun, Pnpm, or Npm)
bun install
# or
pnpm install
# or
npm install
```

### 3. Configure environment variables
Copy the environment sample file and configure it with your settings:
```sh
cp .env.sample .env
# or for development
cp .env.sample .env.development
# or for production
cp .env.sample .env.production
```

Edit the `.env` files with your database credentials and other settings.

### 4. Run the development server
```sh
bun run dev
```

For development with nodemon auto-reload:
```sh
bun run dev:nodemon
```

### 5. Access API documentation
Visit `http://localhost:8080/api/v1/docs` for Swagger UI.

---

## Project Structure

The project follows a modular architecture with clear separation of concerns. Here's the complete folder structure:

### `src/`
Main source code directory containing all application logic.

#### `config/`
Contains all configuration setup files for packages and features:
- **`env.config.js`** - Environment variables configuration
- **`swagger.config.js`** - Swagger/OpenAPI documentation setup
- **`security/`** - Security-related configurations
  - `compression.config.js` - Response compression settings
  - `cookie.config.js` - Cookie handling configuration
  - `cors.config.js` - CORS policy configuration
  - `helmet.config.js` - HTTP security headers (Helmet.js)
  - `hpp.config.js` - HTTP Parameter Pollution protection

#### `core/`
Core application logic and utilities:

- **`factories/`** - Factory pattern implementations for singleton creation
  - `router.factory.js` - Centralized router factory used throughout the app

- **`http/`** - HTTP request/response handling
  - `api.error.js` - Error response formatter and handler
  - `api.response.js` - Standard API response formatter

- **`middlewares/`** - Express middleware functions (essential to the application flow)
  - `async-handler.middleware.js` - Wraps async route handlers for error catching
  - `error.middleware.js` - Global error handling middleware
  - `not-found.middleware.js` - 404 Not Found handler
  - `request-id.middleware.js` - Request ID generation and tracking
  - `security.middleware.js` - Security validations and checks
  - `static.middleware.js` - Static file serving configuration
  - `validate.middleware.js` - Request validation middleware

- **`security/`** - Security utilities
  - `hash.security.js` - Password and data hashing methods
  - `jwt.security.js` - JWT token generation and verification

#### `infrastructure/`
Infrastructure and external service integrations:

- **`database/`** - Database service and connections
  - `database.service.js` - Database initialization and management

- **`logger/`** - Logging system
  - `logger.js` - Main logger instance
  - `logger.config.js` - Logger configuration
  - `logger.constants.js` - Logger constants and log levels
  - `logger.format.js` - Log message formatting
  - `logger.service.js` - Logger service wrapper
  - `logger.stream.js` - Log stream management
  - `logger.transports.js` - Transport configurations (file, console, etc.)

#### `modules/`
Feature modules containing domain-specific logic (to be expanded as features grow).

#### `routes/`
Route definitions and handlers:
- **`health.route.js`** - Health check endpoint
- **`index.js`** - Main routes entry point

#### `shared/`
Shared utilities and constants used across the application:

- **`constants/`** - Application-wide constants
  - `api.constants.js` - API-related constants
  - `app.constants.js` - Application constants
  - `http.constants.js` - HTTP status codes and messages
  - `regex.constants.js` - Regular expressions for validation
  - `security.constants.js` - Security-related constants
  - `validation.constants.js` - Validation rules and messages

- **`schemas/`** - Data validation schemas
  - `env.schema.js` - Environment variable schema validation (Zod)

- **`utils/`** - Utility helper functions
  - `cookie.utils.js` - Cookie manipulation helpers
  - `object.utils.js` - Object/data manipulation helpers
  - `uuid.utils.js` - UUID generation utilities
  - `zod.utils.js` - Zod validation helpers and custom validators

#### Root Files
- **`app.js`** - Express app initialization and middleware setup
- **`index.js`** - Application entry point

---

## Available Commands

```sh
# Development
bun run dev              # Run with hot reload
bun run dev:nodemon     # Run with nodemon auto-reload

# Production
bun run build           # Build for production
bun run start           # Start production server

# Linting & Formatting
bun run lint            # Run Biome linter
bun run format          # Format code with Biome
```

---

## Environment Variables

Required environment variables (see `.env.sample` for all options):
- `NODE_ENV` - Environment mode (development, production)
- `PORT` - Server port (default: 8080)
- `DATABASE_URL` - Database connection string
- API keys and secrets for third-party services

---

## Technologies

- **Runtime**: Bun / Node.js
- **Framework**: Express.js
- **Validation**: Zod
- **Logging**: Winston
- **Security**: Helmet, CORS, HPP
- **API Docs**: Swagger/OpenAPI
- **Linting**: Biome

---

## Contributing

Please ensure code follows the project structure and conventions outlined above before submitting PRs.

---

## License

MIT

