
# MangaMarket

The MangaMarket Web Application is a Node.js and Express-based web application that allows users to search and browse manga titles securely. The project implements secure data handling, input validation, and efficient query processing to protect against common security vulnerabilities such as injection attacks. This project was created as part of the ITIS 5166: Network-Based Application Development course at UNC Charlotte, and will be updated until May 2025.




## Features

- Secure Full-Text Search -> implements server-side filtering and query sanitization to prevent injection attacks.
- RESTful API Architecture, which uses Express.js to manage CRUD operations securely.
- MongoDB Data Storage, to securely store manga data with Mongoose models and schema validation.
- Error Handling & Input Validation: Protects against invalid input and unauthorized access.
- Sorting & Filtering: Sorts manga by price and keyword search for enhanced usability.
## Tech Stack

**Backend:** Node.js, Express.js

**Database:** MongoDB with Mongoose ORM

**Templating Engine:** EJS

**Security Measures:** Input validation, error handling, secure routing


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

Enter localhost:300 in your browser's search bar and give it a try!
## Security Considerations:

**Implemented Security Measures:**

- Multer for Secure Image Uploads to prevent file-type spoofing

- Sanitized search queries to prevent NoSQL injection

- Proper error handling to prevent information leakage

- Restricted API access (upcoming authentication & role-based control)
## Future Prospects

**Planned Features**
- User authentication and role-based access control

- Secure payment integration for manga purchases

- Logging and monitoring for security auditing