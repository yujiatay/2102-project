# Booklah! - CS2102 Team 17

## Topic E: Restaurant Reservation
This application provides a platform for the booking of reservations at restaurants.

## Target Users & Features
2 target users are currently supported:
- Diners
  - Can set their profile (includes information about their location, cuisines, opening hours, menu items)
  - Can indicate their availability by day and time
  - Can see all their bookings for each day, including confirmed status
  - Can confirm reservations made by diners
  - Can receive notifications when reservations change
- Restaurants
  - Can search for restaurants by name, cuisine types, tags, and budget
  - Can bookmark restaurants
  - Can book a reservation (time slot) with a specified number of diners
  - Can cancel reservations
  - Can leave reviews for restaurants
  - Can write articles
  - Can comment on articles
  - Can invite friends with their referral code

## Running the Code

### Running the Server

1. Navigate to the `/backend` folder.
2. Copy `.env.example` to `.env` and change the database credentials accordingly.
3. Run `npm install` or `yarn` to install the dependencies.
4. Run `npm run dev` or `yarn dev` to run the server.
  - The database should be automatically created. If the creation of database encounters a timeout, restart the server once.

### Running the Dev Server for Front-end

This section is not necessary if you're using the source code provided in the .zip since the front-end has already been pre-built. You can simply navigate to http://localhost:8000 to view the application.

1. Navigate to the `/frontend` folder.
2. Run `npm install` or `yarn` to install the dependencies.
3. Run `npm start` or `yarn start` to run a development server that serves the front-end code.
4. Navigate to http://localhost:3000 to view the application.