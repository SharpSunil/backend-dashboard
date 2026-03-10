Features
Authentication

Secure login using JWT (JSON Web Token)
Passwords stored using bcrypt hashing
Role-Based Access
The system supports two user roles.

Admin
Admin users have full access to the system:
View all orders
Update order status
Update payment status
Add notes to orders

Viewer
Viewer users have read-only access:
View order list
Apply filters
Search orders
Viewer users cannot modify any data.
Technologies Used

Node.js
Express.js
MySQL (Free Online Database)
JWT Authentication

bcrypt (Password Hashing)
dotenv (Environment Configuration)
Environment Setup

The project uses a .env file to configure the database connection.

Create a .env file in the root directory:

PORT=5000

# Database Configuration
DB_HOST=sql.freedb.tech
DB_PORT=3306
DB_USER=freedb_sunilshelke
DB_PASSWORD="s9*RJ5DQ?6daZjg"
DB_NAME=freedb_ecommerc

# JWT Authentication
JWT_SECRET=access_secret_key
REFRESH_TOKEN_SECRET=refresh_secret_key

This allows easy and secure configuration of the database.

Database Setup
The required tables are created automatically through backend code.
Tables used in the project:

Users
Products
Orders
Order Notes
Audit Logs



Seed Data
A seed.js file is included to populate the database with dummy users and product data for testing.
Run the following command:
node seed.js
This will create:
Admin user
Viewer user
Sample products
Login Credentials (Testing)
Admin Login
Email
admin@gmail.com
Password
123456

Admin permissions:
Update order status
Update payment status
Add notes to orders

Viewer Login
Email
viewer@gmail.com
Password
123456

Viewer permissions:
View orders
Apply filters
Search data
Viewer cannot update any information.

Order Filters
The system supports multiple filters for order management.
You can search orders using:
Email
Date range
Payment status
Order status


Running the Project
Install dependencies
npm install
Run seed script
node seed.js
Start the server
npm start

The server will run on:

http://localhost:5000
Security

The system follows secure development practices:

Passwords are stored using bcrypt hashing

Authentication uses JWT tokens

Role-based access control is implemented

Important actions are recorded in audit logs

Project Structure
Backend
│
├── controller
│   └── AuthController.js
│
├── db
│   └── Database.js
│
├── models
│   └── UserModel.js
│
├── routes
│   └── AuthRoutes.js
│
├── services
│   └── AuthService.js
│
├── seed.js
├── server.js
├── .env
└── README.md
Summary

This backend application provides a secure and scalable order management system with:

Role-based authentication

Order and payment management

Secure password storage

Order filtering and search

Easy database configuration using .env

Dummy testing data using seed.js