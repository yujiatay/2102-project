-- Remove existing sample entities
DELETE FROM Diners WHERE username = 'testdiner1';
DELETE FROM Diners WHERE username = 'testdiner2';
DELETE FROM Restaurants WHERE username = 'testrestaurant1';
DELETE FROM Restaurants WHERE username = 'testrestaurant2';

-- Create sample entities
INSERT INTO Diners (username, password, email, referral_code) VALUES ('testdiner1', 'password', 'testdiner1@email.com', 'abcdef');
INSERT INTO Diners (username, password, email, referral_code) VALUES ('testdiner2', 'password', 'testdiner2@email.com', 'ghijkl');
INSERT INTO Restaurants VALUES ('testrestaurant1', 'password', 'testrestaurant1@email.com', 'French Food Club', 15, '8 Club Street', 'Mon to Wed, 8am - 12pm', 20);
INSERT INTO Restaurants VALUES ('testrestaurant2', 'password', 'testrestaurant2@email.com', 'Thai Food Club', 21, '8 Club Street', 'Tues to Thurs, 12pm - 5pm', 20);

-- Add tags for restaurants
INSERT INTO Tags (name) VALUES ('Dog-Friendly'), ('Family');
INSERT INTO RestaurantTags (username, tag) VALUES ('testrestaurant1', 'Dog-Friendly'), ('testrestaurant2', 'Dog-Friendly'), ('testrestaurant1', 'Family');

-- Add opening hours for restaurants
INSERT INTO AvailableSlots VALUES ('testrestaurant1', 2, '08:00', '09:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant1', 2, '09:00', '10:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant1', 2, '10:00', '11:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant1', 2, '11:00', '12:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant1', 3, '08:00', '09:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant1', 3, '09:00', '10:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant1', 3, '10:00', '11:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant1', 3, '11:00', '12:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant1', 4, '08:00', '09:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant1', 4, '09:00', '10:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant1', 4, '10:00', '11:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant1', 4, '11:00', '12:00');

INSERT INTO AvailableSlots VALUES ('testrestaurant2', 3, '12:00', '13:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 3, '13:00', '14:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 3, '14:00', '15:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 3, '15:00', '16:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 3, '16:00', '17:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 4, '12:00', '13:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 4, '13:00', '14:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 4, '14:00', '15:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 4, '15:00', '16:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 4, '16:00', '17:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 5, '12:00', '13:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 5, '13:00', '14:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 5, '14:00', '15:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 5, '15:00', '16:00');
INSERT INTO AvailableSlots VALUES ('testrestaurant2', 5, '16:00', '17:00');

-- Add menu items for restaurants
INSERT INTO MenuItems (username, name, type, price, description, image) VALUES ('testrestaurant1', 'Baguette', 3, 5.5, 'Premium Bread Choice', 'https://via.placeholder.com/150C/');
INSERT INTO MenuItems (username, name, type, price, description, image) VALUES ('testrestaurant1', 'Chicken Aglio Olio with Lobster', 1, 20.2, 'Served with a side of premium french bread.', 'https://via.placeholder.com/150C/');
INSERT INTO MenuItems (username, name, type, price, description, image) VALUES ('testrestaurant2', 'Fried Lard', 2, 3, 'Double fried for double the lard', 'https://via.placeholder.com/150C/');
INSERT INTO MenuItems (username, name, type, price, description, image) VALUES ('testrestaurant2', 'Pad Thai', 1, 10, 'House specialty, extra spicy for the spice lovers.', 'https://via.placeholder.com/150C/');

-- Add bookings
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message, is_confirmed)
VALUES ('testrestaurant1', 'testdiner1', 2, '10:00', '11:00', 1571364000000, 4, 'Window seats please', true);
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message)
VALUES ('testrestaurant1', 'testdiner1', 2, '10:00', '11:00', 1574042400000, 4, 'Window seats please');
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message)
VALUES ('testrestaurant1', 'testdiner2', 2, '10:00', '11:00', 1574042400000, 4, '');

-- Add reviews
INSERT INTO Reviews (rusername, dusername, comment, rating) VALUES ('testrestaurant1', 'testdiner1', 'Good food. 10/5 would recommend for premium breads.', 5);

-- Add articles
INSERT INTO Articles (username, title, content, created_at) VALUES ('testdiner1', 'Food is Good.', 'I love food. Food is good. Good food.', 1551369600000);
INSERT INTO Articles (username, title, content, created_at) VALUES ('testdiner1', 'Food is Always Good.', 'I always love food. Food is always good. Always good food.', 1551456000000);

-- Add comments
INSERT INTO Comments (ausername, acreated_at, username, content) VALUES ('testdiner1', 1551369600000, 'testdiner2', 'But food is also not so good.');
INSERT INTO Comments (ausername, acreated_at, username, content) VALUES ('testdiner1', 1551456000000, 'testdiner1', 'Fooooooooooooooooooooood.');
