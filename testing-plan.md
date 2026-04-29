# Testing Plan – Warframe API

## Overview
This testing plan covers all API endpoints for the Warframe relic and reward management system. The API includes authentication, relic management, and reward management with role-based access control.

**Base URL:** `http://localhost:3000/api`

**Authentication:** JWT Bearer tokens required for all endpoints except signup/login

## Setup Instructions
1. Start the server: `npm start` or `node src/server.js`
2. Access Swagger UI at: `http://localhost:3000/api-docs` (if configured)
3. For testing in Swagger/Postman, use the Authorize button to set Bearer tokens

---

## 1. Authentication Endpoints

### POST /api/auth/signup
**Access Control:** Public (no authentication required)

#### Success Case: Create New User
- **Setup:** None required
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Expected Response:** 201 Created
  ```json
  {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
  ```

#### 400 Bad Request: Missing Required Fields
- **Request Body:** `{}`
- **Expected Response:** 400 Bad Request
  ```json
  {
    "error": "Missing required fields"
  }
  ```

#### 409 Conflict: Duplicate Email/Username
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Expected Response:** 409 Conflict
  ```json
  {
    "error": "User already exists"
  }
  ```

### POST /api/auth/login
**Access Control:** Public (no authentication required)

#### Success Case: Valid Credentials
- **Setup:** Use credentials from successful signup
- **Request Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Expected Response:** 200 OK
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Post-Action:** Copy the JWT token for use in authenticated requests

#### 400 Bad Request: Missing Credentials
- **Request Body:** `{}`
- **Expected Response:** 400 Bad Request
  ```json
  {
    "error": "Missing credentials"
  }
  ```

#### 401 Unauthorized: Invalid Credentials
- **Request Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "wrongpassword"
  }
  ```
- **Expected Response:** 401 Unauthorized
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

---

## 2. Relic Endpoints

### GET /api/relics
**Access Control:** Authenticated users only

#### Success Case: Get All Relics
- **Setup:** Login with any user account and set Bearer token
- **Expected Response:** 200 OK
  ```json
  [
    {
      "id": 1,
      "name": "Lith A1",
      "era": "Lith",
      "vaulted": false
    }
  ]
  ```

#### 401 Unauthorized: No Token
- **Setup:** Remove Authorization header
- **Expected Response:** 401 Unauthorized
  ```json
  {
    "error": "Unauthorized: No token provided"
  }
  ```

### GET /api/relics/:id
**Access Control:** Authenticated users only

#### Success Case: Get Specific Relic
- **Setup:** Login and set Bearer token, use valid relic ID
- **URL Parameter:** `id = 1`
- **Expected Response:** 200 OK
  ```json
  {
    "id": 1,
    "name": "Lith A1",
    "era": "Lith",
    "vaulted": false
  }
  ```

#### 404 Not Found: Invalid ID
- **Setup:** Login and set Bearer token
- **URL Parameter:** `id = 9999`
- **Expected Response:** 404 Not Found
  ```json
  {
    "error": "Relic not found"
  }
  ```

#### 401 Unauthorized: No Token
- **Setup:** Remove Authorization header
- **Expected Response:** 401 Unauthorized
  ```json
  {
    "error": "Unauthorized: No token provided"
  }
  ```

### POST /api/relics
**Access Control:** Admin users only

#### Success Case: Create New Relic
- **Setup:** Login with admin account and set Bearer token
- **Request Body:**
  ```json
  {
    "name": "Meso V1",
    "era": "Meso",
    "vaulted": false
  }
  ```
- **Expected Response:** 201 Created
  ```json
  {
    "id": 2,
    "name": "Meso V1",
    "era": "Meso",
    "vaulted": false
  }
  ```

#### 403 Forbidden: Non-Admin User
- **Setup:** Login with regular user account and set Bearer token
- **Request Body:**
  ```json
  {
    "name": "Test Relic",
    "era": "Test",
    "vaulted": false
  }
  ```
- **Expected Response:** 403 Forbidden
  ```json
  {
    "error": "Forbidden: Insufficient permissions"
  }
  ```

#### 401 Unauthorized: No Token
- **Setup:** Remove Authorization header
- **Expected Response:** 401 Unauthorized
  ```json
  {
    "error": "Unauthorized: No token provided"
  }
  ```

### PUT /api/relics/:id
**Access Control:** Admin users only

#### Success Case: Update Relic
- **Setup:** Login with admin account, set Bearer token, ensure relic exists
- **URL Parameter:** `id = 1`
- **Request Body:**
  ```json
  {
    "name": "Lith A1 Updated",
    "era": "Lith",
    "vaulted": true
  }
  ```
- **Expected Response:** 200 OK
  ```json
  {
    "id": 1,
    "name": "Lith A1 Updated",
    "era": "Lith",
    "vaulted": true
  }
  ```

#### 404 Not Found: Invalid ID
- **Setup:** Login with admin account and set Bearer token
- **URL Parameter:** `id = 9999`
- **Request Body:**
  ```json
  {
    "name": "Test Relic",
    "era": "Test",
    "vaulted": false
  }
  ```
- **Expected Response:** 404 Not Found
  ```json
  {
    "error": "Relic not found"
  }
  ```

#### 403 Forbidden: Non-Admin User
- **Setup:** Login with regular user account and set Bearer token
- **Expected Response:** 403 Forbidden
  ```json
  {
    "error": "Forbidden: Insufficient permissions"
  }
  ```

### DELETE /api/relics/:id
**Access Control:** Admin users only

#### Success Case: Delete Relic
- **Setup:** Login with admin account, set Bearer token, ensure relic exists
- **URL Parameter:** `id = 1`
- **Expected Response:** 200 OK
  ```json
  {
    "message": "Relic deleted successfully"
  }
  ```

#### 404 Not Found: Invalid ID
- **Setup:** Login with admin account and set Bearer token
- **URL Parameter:** `id = 9999`
- **Expected Response:** 404 Not Found
  ```json
  {
    "error": "Relic not found"
  }
  ```

#### 403 Forbidden: Non-Admin User
- **Setup:** Login with regular user account and set Bearer token
- **Expected Response:** 403 Forbidden
  ```json
  {
    "error": "Forbidden: Insufficient permissions"
  }
  ```

---

## 3. Reward Endpoints

### GET /api/rewards
**Access Control:** Authenticated users only

#### Success Case: Get All Rewards
- **Setup:** Login with any user account and set Bearer token
- **Expected Response:** 200 OK
  ```json
  [
    {
      "id": 1,
      "name": "Nitain Extract",
      "rarity": "Rare",
      "ducat_value": 45
    }
  ]
  ```

#### 401 Unauthorized: No Token
- **Setup:** Remove Authorization header
- **Expected Response:** 401 Unauthorized
  ```json
  {
    "error": "Unauthorized: No token provided"
  }
  ```

### GET /api/rewards/:id
**Access Control:** Authenticated users only

#### Success Case: Get Specific Reward
- **Setup:** Login and set Bearer token, use valid reward ID
- **URL Parameter:** `id = 1`
- **Expected Response:** 200 OK
  ```json
  {
    "id": 1,
    "name": "Nitain Extract",
    "rarity": "Rare",
    "ducat_value": 45
  }
  ```

#### 404 Not Found: Invalid ID
- **Setup:** Login and set Bearer token
- **URL Parameter:** `id = 9999`
- **Expected Response:** 404 Not Found
  ```json
  {
    "error": "Reward not found"
  }
  ```

#### 401 Unauthorized: No Token
- **Setup:** Remove Authorization header
- **Expected Response:** 401 Unauthorized
  ```json
  {
    "error": "Unauthorized: No token provided"
  }
  ```

### POST /api/rewards
**Access Control:** Admin users only

#### Success Case: Create New Reward
- **Setup:** Login with admin account and set Bearer token
- **Request Body:**
  ```json
  {
    "name": "Argon Crystal",
    "rarity": "Uncommon",
    "ducat_value": 25
  }
  ```
- **Expected Response:** 201 Created
  ```json
  {
    "id": 2,
    "name": "Argon Crystal",
    "rarity": "Uncommon",
    "ducat_value": 25
  }
  ```

#### 403 Forbidden: Non-Admin User
- **Setup:** Login with regular user account and set Bearer token
- **Request Body:**
  ```json
  {
    "name": "Test Reward",
    "rarity": "Common",
    "ducat_value": 10
  }
  ```
- **Expected Response:** 403 Forbidden
  ```json
  {
    "error": "Forbidden: Insufficient permissions"
  }
  ```

### PUT /api/rewards/:id
**Access Control:** Admin users only

#### Success Case: Update Reward
- **Setup:** Login with admin account, set Bearer token, ensure reward exists
- **URL Parameter:** `id = 1`
- **Request Body:**
  ```json
  {
    "name": "Nitain Extract Updated",
    "rarity": "Rare",
    "ducat_value": 50
  }
  ```
- **Expected Response:** 200 OK
  ```json
  {
    "id": 1,
    "name": "Nitain Extract Updated",
    "rarity": "Rare",
    "ducat_value": 50
  }
  ```

#### 404 Not Found: Invalid ID
- **Setup:** Login with admin account and set Bearer token
- **URL Parameter:** `id = 9999`
- **Request Body:**
  ```json
  {
    "name": "Test Reward",
    "rarity": "Common",
    "ducat_value": 10
  }
  ```
- **Expected Response:** 404 Not Found
  ```json
  {
    "error": "Reward not found"
  }
  ```

### DELETE /api/rewards/:id
**Access Control:** Admin users only

#### Success Case: Delete Reward
- **Setup:** Login with admin account, set Bearer token, ensure reward exists
- **URL Parameter:** `id = 1`
- **Expected Response:** 200 OK
  ```json
  {
    "message": "Reward deleted successfully"
  }
  ```

#### 404 Not Found: Invalid ID
- **Setup:** Login with admin account and set Bearer token
- **URL Parameter:** `id = 9999`
- **Expected Response:** 404 Not Found
  ```json
  {
    "error": "Reward not found"
  }
  ```

---

## Test User Accounts Setup

For testing purposes, you'll need to create test accounts. Since signup only creates USER role accounts, you'll need to manually create an admin account in the database or modify an existing user's role.

### Creating Test Data
1. **Create regular user account** via `/api/auth/signup`
2. **Create admin account** by running this SQL in pgAdmin:
   ```sql
   INSERT INTO "User" (username, email, password_hash, role)
   VALUES ('admin', 'admin@test.com', '$2b$10$hashedpassword', 'ADMIN');
   ```
   Or update an existing user:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@test.com';
   ```

### Sample Test Data
**Admin Account:**
- Email: `admin@test.com`
- Password: `admin123`

**Regular User Account:**
- Email: `user@test.com`
- Password: `user123`

## Notes
- All endpoints except signup/login require JWT authentication
- Admin-only operations (CREATE, UPDATE, DELETE) require `role: "ADMIN"` in JWT
- Error responses follow REST conventions with appropriate HTTP status codes
- Database relationships exist between Users, Relics, and Rewards but are not fully utilized in current endpoints