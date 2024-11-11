# International Bank Payment System

### Overview
This system is an internal international payment solution designed for an international bank. It facilitates secure, user-friendly processing of international payments, ensuring sensitive customer and transaction information is protected. The portal is divided into two main user roles:

1. **Customers**: Register, log in, and initiate international payments through a secure portal.
2. **Employees**: Access and manage customer transactions, verify payment details, and forward payments to the SWIFT network for processing.

### Features
- **Customer Registration**: Customers register with personal details including full name, ID number, account number, and password.
- **Customer Login**: Secure login for customers using a username, account number, and password.
- **Payment Initiation**: Customers can enter payment details, choose a currency, select a provider (e.g., SWIFT), and provide account and SWIFT code information for the recipient.
- **Employee Portal**: Pre-registered employees can view and verify transactions, check SWIFT codes, and submit verified payments to SWIFT.
- **Data Security**: Implementation of secure password storage with hashing and salting, SSL for data in transit, and access control for sensitive information.

### Security Considerations
- **Password Security**: All passwords are hashed and salted before storage to enhance security.
- **SSL Encryption**: All data exchanged is encrypted using SSL to prevent interception.
- **Input Validation**: All input fields are validated to prevent SQL injection and other injection attacks.
- **JWT Authentication**: JSON Web Tokens (JWT) are used to authenticate user sessions securely.
- **Brute-force Protection**: Brute-force protection is implemented for login endpoints to limit login attempts and prevent unauthorized access.

### Technologies Used
- **Frontend**: React
- **Backend**: Node.js (Express), MongoDB for secure data storage
- **Authentication**: JWT (JSON Web Tokens) for session management and secure authentication
- **Security Libraries**: bcrypt for password hashing, SSL for data encryption, and express-brute for brute-force attack prevention

### Installation

1. **Clone the Repository**
   https://github.com/mameen911/https---github.com-VCDN-2024-apds7311-poe-mameen911

### Login details
1. Employee
   Employee Number - TELLER001
   Password - Password123!

2. Customer
   Account Number - MCU7ENR303
   Password - User@123
