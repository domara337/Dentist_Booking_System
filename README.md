

---

# Dentist Booking System

This is the full stack dentist Booking System that allows patients to book appointments with dentists, manage availability, and handle user authentication. Admin users can manage dentists and users.

---

## Features

* User registration and login with JWT authentication
* Role-based access control for Patients, Dentists, and Admins
* Dentist profile management and approval system
* Manage dentist availability (working days and time slots)
* Appointment booking, updating, cancellation, and status tracking
* (Optional) Payment processing integration
* Admin dashboard APIs for managing users and dentists

---

## Technologies Used

* Node.js
* Express.js
* PostgreSQL
* JWT for authentication
* bcrypt for password hashing
* pg (node-postgres) for DB interaction
* dotenv for environment variables

---

## Getting Started

### Prerequisites

* Node.js (v16+)
* PostgreSQL (v12+)
* npm or yarn

### Installation

1. Clone the repo

   ```bash
   git clone https://github.com/yourusername/dentist-booking-backend.git
   cd dentist-booking-backend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Setup environment variables
   Create a `.env` file in the root directory:

   ```
   PORT=5000
   DATABASE_URL=postgresql://user:password@localhost:5432/dentistbooking
   JWT_SECRET=your_jwt_secret_key
   ```

4. Setup your PostgreSQL database
   Run the SQL scripts in `/db` folder to create tables and enums.

5. Start the server

   ```bash
   npm run dev
   ```



## Project Structure

```
/src
  /controllers    # Route handlers
  /models         # Database query functions
  /middlewares    # Auth, error handling middleware
  /routes         # Express routes
  server.js       # Entry point

```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## License

This project is licensed under the MIT License.

---

