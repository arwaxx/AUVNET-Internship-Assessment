Welcome to the E-Commerce App repository. This project is a comprehensive solution for managing an online store, built with Node.js and Express, featuring a robust backend API for user management, product management, wishlist functionality, and more.

Table of Contents
Overview
Features
Technologies Used
Getting Started
Installation
Environment Variables
Running the Application
API Endpoints
User Routes
Admin Routes
Product Routes
Wishlist Routes
Category Routes
Testing
Contributing
License
Overview
The E-Commerce App is a backend service for an e-commerce platform, providing APIs for user registration, authentication, product management, and wishlist management. It is designed to be scalable, maintainable, and easy to integrate with any frontend framework or application.

Features
User Authentication: Secure signup and login with hashed passwords.
Admin Management: Admin-specific routes for managing users, products, and categories.
Product Management: Create, update, delete, and view products.
Wishlist: Users can add and remove products from their wishlist.
Category Management: Admins can create, update, and delete product categories.
Technologies Used
Node.js & Express: Backend framework and server.
Sequelize: ORM for database management.
MySQL: Relational database for storing data.
JWT: JSON Web Tokens for secure authentication.
Bcrypt: Password hashing for secure storage.
dotenv: Environment variables management.
Getting Started
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
Install dependencies:

bash
Copy code
npm install
Environment Variables
Create a .env file in the root of the project and add the following variables:

plaintext
Copy code
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
Running the Application
To start the server, run:

bash
Copy code
npm start
The server will start on http://localhost:3000.

API Endpoints
User Routes
POST /api/auth/signup: Register a new user.
POST /api/auth/login: Log in and receive a JWT token.
Admin Routes
GET /api/admins: Get all admins (admin only).
POST /api/admins: Add a new admin (admin only).
DELETE /api/admins/:id: Delete an admin (admin only).
Product Routes
GET /api/products: Get all products.
POST /api/products: Add a new product (admin only).
PUT /api/products/:id: Update a product (admin only).
DELETE /api/products/:id: Delete a product (admin only).
Wishlist Routes
GET /api/wishlist: Get user's wishlist.
POST /api/wishlist: Add a product to the wishlist.
DELETE /api/wishlist/:id: Remove a product from the wishlist.
Category Routes
GET /api/categories: Get all categories.
POST /api/categories: Add a new category (admin only).
PUT /api/categories/:id: Update a category (admin only).
DELETE /api/categories/:id: Delete a category (admin only).
Testing
Use Postman or any API testing tool to interact with the endpoints. Make sure to include the JWT token in the Authorization header for routes that require authentication.

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

License
This project is licensed under the MIT License - see the LICENSE file for details.
