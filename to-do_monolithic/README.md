# **Monolithic To-Do App Overview**

The **monolithic architecture** places all application logic (routing, validation, business logic, and database access) inside a tightly connected structure. Everything lives together and executes as one unified codebase.

This architecture is simple and great for small projects, but becomes harder to maintain as complexity grows.

---

# **How the Monolithic App Works**

In the monolithic version of the To-Do app, the flow of a request looks like this:

**HTTP Request → Routes → Store → Database**

All responsibilities—HTTP handling, logic, and database access—are contained within a small number of files.

---

## **1. Routes (routes/todo.routes.ts)**

### **Purpose:**  
Handle incoming HTTP requests.

### **Responsibilities:**
- Register endpoints like `GET /todos`, `POST /todos`, etc.
- Validate request body minimally
- Call the store directly
- Send back JSON responses

### **Example:**  
Inside `todo.routes.ts`, you will see:
- The API endpoint definitions  
- Business logic (checking fields, parsing input)  
- Database access via `todoStore`

Everything is handled in this single layer.

---

## **2. Store (store/todo.store.ts)**

### **Purpose:**  
Provide direct database access using SQLite via `better-sqlite3`.

### **Responsibilities:**
- Run SQL queries
- Insert, update, delete, and select todos
- Map database rows to JavaScript objects

### **Example:**  
`todoStore.getAll()` runs SQL like:

```sql
SELECT * FROM todos;
