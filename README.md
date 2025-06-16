
# MangaMarket

The MangaMarket Web Application is a Node.js and Express-based web application that allows users to search and browse manga titles securely, allowing users to browse, list, and make offers on rare manga titles. The project emphasizes secure coding practices including authentication, authorization, input validation, and protection against injection and XSS attacks. This project was created as part of the ITIS 5166: Network-Based Application Development course at UNC Charlotte




## Features
- Secure Full-Text Search --> Implements server-side filtering and sanitization to mitigate NoSQL injection.
- Role-Based Access Control --> Only manga owners can edit/delete listings or accept offers.
- Offer System --> Authenticated users can make offers on active manga, tracked securely per item.
- Image Upload Security --> Uses Multer for file uploads, with restrictions to prevent spoofed file types.
- Input Validation --> All forms validated and sanitized to protect against XSS and malformed data.
- RESTful API Design --> Clean and secure routing via Express controllers and middleware.
- Session-Based Authentication --> Passwords securely hashed with bcrypt and stored via Mongoose.
## Tech Stack

**Backend:** Node.js, Express.js

**Database:** MongoDB with Mongoose ORM

**Templating Engine:** EJS

**Security Measures and Middlware:** Input validation, error handling, secure routing, bcrypt, express-validator, multer, express-session

## Folder Structure (Overview)
MangaMarket/
│
├── models/          # Mongoose schemas for users, mangas, offers
├── controllers/     # Logic for handling routes and DB interaction
├── views/           # EJS templates for frontend
├── public/          # Static assets (images, CSS)
├── routes/          # Express routers
├── middlewares/     # Auth and validator logic
└── app.js           # Main application entry

## Installation & Setup

**Prerequisites**

Install Node.js and MongoDB

Clone this repository:

```bash
    git clone https://github.com/ahafiz03/MangaMarket.git
    cd MangaMarket
```
**Install Dependencies**
```bash
    npm install
```
**Start the Server**
```bash
    node app.js
```
or using Nodemon for auto-start:
```bash
    npm nodemon app.js
```
if neither of these work, use:
```bash
    nodemon app
```
**Accessing the Application**

Enter http://localhost:3000 in your browser's search bar and give it a try!

## Security Features

**Implemented Security Measures:**
- Input validation & sanitation using express-validator
- Passwords securely hashed with bcrypt
- Server-side authorization using session-based checks
- Custom error handling to avoid leaking stack traces
- Role restrictions: Only the item owner can manage offers or delete the listing
- Query sanitization to prevent NoSQL injection
- Secure file upload handling with multer


## Future Prospects

**Planned Features**
- OAuth login or two-factor authentication
- Secure payment integration for manga purchases
- Admin dashboard with activity logging and monitoring
- Email notifications on accepted offers

## Developed By:
Anum Hafiz – Master’s in Cybersecurity @ UNC Charlotte
