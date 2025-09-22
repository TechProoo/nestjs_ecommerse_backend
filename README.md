# 🛒 E-Commerce API – Use Case 1

This repository contains the OpenAPI 3.0 specification for an **e-commerce application API**.  
It documents the endpoints for managing products, orders, and reviews.

---

## 📍 Base URLs

| Environment | URL                     | Description              |
| ----------- | ----------------------- | ------------------------ |
| Development | `http://localhost:3000` | Local development server |

---

## 📄 API Info

- **Version:** 1.0.0
- **Title:** Use case 1 – E-Commerce
- **Description:** E-commerce application API documentation
- **Contact:** [olaoluwaoyetibo@gmail.com](mailto:olaoluwaoyetibo@gmail.com)

---

## 🏷️ Tags

| Tag         | Description                             |
| ----------- | --------------------------------------- |
| `admins`    | Secured admin-only calls                |
| `protected` | Endpoints requiring authorization token |
| `products`  | Products-related endpoints              |

---

## 🗂️ Endpoints Overview

### Products

| Method   | Path                              | Summary                                    | Tags                        |
| -------- | --------------------------------- | ------------------------------------------ | --------------------------- |
| `GET`    | `/products`                       | List all products with pagination          | products                    |
| `POST`   | `/products`                       | Create a new product                       | products, protected, admins |
| `GET`    | `/products/{id}`                  | Get a product by ID                        | products                    |
| `PUT`    | `/products/{id}`                  | Update a product by ID                     | products, protected         |
| `DELETE` | `/products/{id}`                  | Soft delete a product by ID                | products, protected, admins |
| `GET`    | `/products/{id}/orders`           | List orders for a product with pagination  | products                    |
| `GET`    | `/products/{id}/orders/{orderId}` | Get a specific order by ID for a product   | products                    |
| `GET`    | `/products/{id}/reviews`          | List reviews for a product with pagination | products                    |
| `GET`    | `/products/search`                | Search for products                        | products                    |

---

## 🔑 Parameters

### Common Pagination

- **`page`** (query): Page number (integer ≥ 1)
- **`limit`** (query): Number of items per page (integer)

### Path Parameters

- **`id`** (path): UUID of the product
- **`orderId`** (path): UUID of the order

### Search Query Parameters

- **`keyword`** (query): Keyword to search product names/descriptions
- **`minPrice`** (query): Minimum price filter (number)
- **`maxPrice`** (query): Maximum price filter (number)

---

## 📦 Schemas

### `Id`

- `string` (UUID)

### `BaseProduct`

| Field         | Type   | Example                          |
| ------------- | ------ | -------------------------------- |
| `name`        | string | iPhone 15 Pro Max                |
| `description` | string | Full product description         |
| `price`       | number | 1200.03                          |
| `brand`       | string | Apple                            |
| `specs`       | object | `{ "Ram": "8Go", "SSD": "1To" }` |

### `Product` = `BaseProduct` + `id`

### `Order`

| Field        | Type          | Description                      |
| ------------ | ------------- | -------------------------------- |
| `user`       | string (UUID) | ID of user placing the order     |
| `quantity`   | integer ≥ 1   | Quantity ordered                 |
| `totalPrice` | number        | Total price of the order         |
| `payment`    | string (UUID) | Payment ID attached to the order |

### `APIResponse`

| Field     | Type    | Required |
| --------- | ------- | -------- |
| `success` | boolean | ✅       |
| `message` | string  | ✅       |
| `error`   | object  |          |
| `data`    | object  | ✅       |

### `User`

- `id`: string (UUID)
- `name`: string

---

## ✅ Standard Responses

- **200 OK**  
  Returns an [`APIResponse`](#apiresponse) object.

- **201 Created**  
  Returned when a resource is successfully created.

Error responses follow the same `APIResponse` schema with `success=false` and an `error` object.

---

## 🚀 How to Use Locally

1. Start your server on port 3000.
2. Navigate to `http://localhost:3000` or the documentation UI (Swagger, Redoc, etc.).
3. Use the endpoints as defined above with the appropriate HTTP methods.

---

## 📚 Tools

This spec is OpenAPI 3.0 compatible. You can:

- Load it into Swagger UI or Postman to test endpoints.
- Generate client SDKs using `openapi-generator`.

---
