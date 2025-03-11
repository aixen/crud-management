# Gateway JWT Authentication | CRUD Management

This project is a Vue 3 application that implements Gateway key hashing and JWT authentication using Pinia for state management and Vue Router for navigation.

## Features
- User request with secret key
- User authentication with Secret Key and JWT
- Token refresh mechanism every 3600 seconds
- State management with Pinia
- Vue Router for navigation
- Bootstrap Vue for UI components
- API Gateway integration for authentication and CRUD management

## Installation

### Prerequisites
Make sure you have Node.js and npm installed:
```sh
node -v
npm -v
```

### Clone the Repository
```sh
git clone https://github.com/aixen/crud-management.git
cd crud-management
```

### Install Dependencies
```sh
npm install
```

### Environment Variables
Create a `.env` file and configure the API base URL:
```
VITE_API_BASE_URL=<gateway_domain>
VITE_API_SECRET_KEY=<secret_key>
VITE_API_KEY=<api_key>
```

## Running the Application

### Start the Development Server
```sh
npm run dev
```
This will start the Vue app at `http://localhost:5173` (default Vite port).

<!-- ## Authentication Flow
1. **Login**: The user enters credentials and receives a JWT token.
2. **State Management**: The token and user data are stored in Pinia.
3. **API Requests**: Authenticated requests include the JWT token in the headers.
4. **Token Refresh**: The app requests a new token every 3600 seconds.
5. **Logout**: The user logs out, clearing the token and state. -->

![Alt text](/public/screenshots/login.jpg?raw=true "Login Page")
