# Foodie - Modern Food Delivery Web Application

A full-stack food delivery platform built with React, Flask, and MongoDB.

## Features
- **Modern UI**: Zomato/Swiggy inspired design with Tailwind CSS and Framer Motion.
- **Authentication**: JWT-based login/register with password hashing.
- **Restaurant Discovery**: Search and browse restaurants by category and ratings.
- **Food Ordering**: Add items to cart, manage quantities, and place orders.
- **Order Tracking**: View order history and status.
- **Admin Dashboard**: Manage restaurants, food items, and view platform analytics.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Axios, Lucide React, Framer Motion.
- **Backend**: Python Flask, Flask-JWT-Extended, PyMongo, Bcrypt.
- **Database**: MongoDB.

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB installed and running locally

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Initialize the database with seed data:
   ```bash
   python seed_db.py
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Admin Credentials
- **Email**: `admin@foodie.com`
- **Password**: `admin123`
