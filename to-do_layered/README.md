# **Layered Architecture Overview**

The layered architecture separates concerns into four layers:

## **Layer 1: Controllers (controllers/)**

Purpose: Handles HTTP requests/responses

Responsibility: Extracts data from requests, calls services, formats responses

Example: `TodoController.getAll()` receives the Express request and sends JSON

## **Layer 2: Services (services/)**

Purpose: Business logic

Responsibility: Validation, business rules, orchestration

Example: `TodoService.createTodo()` can validate data before creating

## **Layer 3: Repositories (repositories/)**

Purpose: Data access abstraction

Responsibility: Database operations, SQL queries, data mapping

Example: `TodoRepository.getAll()` handles all database interactions

## **Layer 4: Models (models/)**

Purpose: Data structures

Responsibility: Type definitions, data contracts

Example: `Todo` interface defines the structure

# **Comparison: Layered vs Monolithic**

## **Monolithic Architecture (original app)**

HTTP Request → Routes → Store → Database

Example from `todo.routes.ts`:

* HTTP handling (Fastify routes)
* Business logic (validation: checking for required fields)
* Data access (calling `todoStore` directly)

All mixed together in one file.

## **Layered Architecture (new app)**

HTTP Request → Controller → Service → Repository → Database

Each layer has a single responsibility.

# **Why Layered Architecture is Better**

## **1. Separation of concerns**

* Each layer has one job
* Easier to understand and maintain
* Changes in one layer don't break others
* Example: Switching from SQLite to PostgreSQL only changes the Repository layer

## **2. Testability**

* Test each layer independently
* Mock dependencies easily

## **3. Reusability**

* Services can be used by different controllers (REST API, GraphQL, CLI)
* Repository can be used by multiple services

## **4. Scalability**

* Add features without touching unrelated code

## **5. Team collaboration**

* Developers can work on different layers
* Clear boundaries reduce conflicts
* Example: Frontend dev works on Controllers, backend dev works on Services

## **6. Flexibility**

* Swap implementations easily
* Example: Replace SQLite with MongoDB by changing only the Repository

## **7. Business logic centralization**

* Business rules live in Services
* Prevents logic from being scattered across routes
* Example: Add validation, logging, or notifications in one place
