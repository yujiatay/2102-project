-- Remove existing sample entities
DELETE FROM Diners WHERE username = 'batman';
DELETE FROM Diners WHERE username = 'superman';
DELETE FROM Restaurants WHERE username = 'burntends';
DELETE FROM Restaurants WHERE username = 'saltedplum';

-- Create sample entities
INSERT INTO Diners (username, password, email, referral_code) VALUES ('batman', '$2b$12$Q2QKlyOebo/wxI3RDO1pDuMG2eVtt0VWqDOTqUaBhDBxtdA3ZjJn6', 'batman@email.com', 'batman');
INSERT INTO Diners (username, password, email, referral_code) VALUES ('superman', '$2b$12$Q2QKlyOebo/wxI3RDO1pDuMG2eVtt0VWqDOTqUaBhDBxtdA3ZjJn6', 'superman@email.com', 'superman');
INSERT INTO Restaurants VALUES ('burntends', '$2b$12$Q2QKlyOebo/wxI3RDO1pDuMG2eVtt0VWqDOTqUaBhDBxtdA3ZjJn6', 'burntends@email.com', 'Burnt Ends', 11, '29 Tanglin Rd, Singapore 247911', 'Mon to Fri, 12pm-10pm', 20);
INSERT INTO Restaurants VALUES ('saltedplum', '$2b$12$Q2QKlyOebo/wxI3RDO1pDuMG2eVtt0VWqDOTqUaBhDBxtdA3ZjJn6', 'saltedplum@email.com', 'The Salted Plum', 12, '10 Circular Road, Singapore 049366', 'Tues to Sat, 6pm - 12am', 20);

-- Add tags for restaurants
INSERT INTO Tags (name) VALUES ('Fine Dining'), ('Chill'), ('Date night'), ('Cozy'), ('Good for groups');
INSERT INTO RestaurantTags (username, tag) VALUES ('burntends', 'Cozy'), ('burntends', 'Good for groups'), ('saltedplum', 'Cozy'), ('saltedplum', 'Date night');

-- Add opening hours for restaurants
INSERT INTO AvailableSlots VALUES ('burntends', 1, '12:00', '13:00');
INSERT INTO AvailableSlots VALUES ('burntends', 1, '13:00', '14:00');
INSERT INTO AvailableSlots VALUES ('burntends', 1, '14:00', '15:00');
INSERT INTO AvailableSlots VALUES ('burntends', 1, '15:00', '16:00');
INSERT INTO AvailableSlots VALUES ('burntends', 1, '16:00', '17:00');
INSERT INTO AvailableSlots VALUES ('burntends', 1, '17:00', '18:00');
INSERT INTO AvailableSlots VALUES ('burntends', 1, '18:00', '19:00');
INSERT INTO AvailableSlots VALUES ('burntends', 1, '19:00', '20:00');
INSERT INTO AvailableSlots VALUES ('burntends', 1, '20:00', '21:00');
INSERT INTO AvailableSlots VALUES ('burntends', 1, '21:00', '22:00');
INSERT INTO AvailableSlots VALUES ('burntends', 2, '12:00', '13:00');
INSERT INTO AvailableSlots VALUES ('burntends', 2, '13:00', '14:00');
INSERT INTO AvailableSlots VALUES ('burntends', 2, '14:00', '15:00');
INSERT INTO AvailableSlots VALUES ('burntends', 2, '15:00', '16:00');
INSERT INTO AvailableSlots VALUES ('burntends', 2, '16:00', '17:00');
INSERT INTO AvailableSlots VALUES ('burntends', 2, '17:00', '18:00');
INSERT INTO AvailableSlots VALUES ('burntends', 2, '18:00', '19:00');
INSERT INTO AvailableSlots VALUES ('burntends', 2, '19:00', '20:00');
INSERT INTO AvailableSlots VALUES ('burntends', 2, '20:00', '21:00');
INSERT INTO AvailableSlots VALUES ('burntends', 2, '21:00', '22:00');
INSERT INTO AvailableSlots VALUES ('burntends', 3, '12:00', '13:00');
INSERT INTO AvailableSlots VALUES ('burntends', 3, '13:00', '14:00');
INSERT INTO AvailableSlots VALUES ('burntends', 3, '14:00', '15:00');
INSERT INTO AvailableSlots VALUES ('burntends', 3, '15:00', '16:00');
INSERT INTO AvailableSlots VALUES ('burntends', 3, '16:00', '17:00');
INSERT INTO AvailableSlots VALUES ('burntends', 3, '17:00', '18:00');
INSERT INTO AvailableSlots VALUES ('burntends', 3, '18:00', '19:00');
INSERT INTO AvailableSlots VALUES ('burntends', 3, '19:00', '20:00');
INSERT INTO AvailableSlots VALUES ('burntends', 3, '20:00', '21:00');
INSERT INTO AvailableSlots VALUES ('burntends', 3, '21:00', '22:00');
INSERT INTO AvailableSlots VALUES ('burntends', 4, '12:00', '13:00');
INSERT INTO AvailableSlots VALUES ('burntends', 4, '13:00', '14:00');
INSERT INTO AvailableSlots VALUES ('burntends', 4, '14:00', '15:00');
INSERT INTO AvailableSlots VALUES ('burntends', 4, '15:00', '16:00');
INSERT INTO AvailableSlots VALUES ('burntends', 4, '16:00', '17:00');
INSERT INTO AvailableSlots VALUES ('burntends', 4, '17:00', '18:00');
INSERT INTO AvailableSlots VALUES ('burntends', 4, '18:00', '19:00');
INSERT INTO AvailableSlots VALUES ('burntends', 4, '19:00', '20:00');
INSERT INTO AvailableSlots VALUES ('burntends', 4, '20:00', '21:00');
INSERT INTO AvailableSlots VALUES ('burntends', 4, '21:00', '22:00');
INSERT INTO AvailableSlots VALUES ('burntends', 5, '12:00', '13:00');
INSERT INTO AvailableSlots VALUES ('burntends', 5, '13:00', '14:00');
INSERT INTO AvailableSlots VALUES ('burntends', 5, '14:00', '15:00');
INSERT INTO AvailableSlots VALUES ('burntends', 5, '15:00', '16:00');
INSERT INTO AvailableSlots VALUES ('burntends', 5, '16:00', '17:00');
INSERT INTO AvailableSlots VALUES ('burntends', 5, '17:00', '18:00');
INSERT INTO AvailableSlots VALUES ('burntends', 5, '18:00', '19:00');
INSERT INTO AvailableSlots VALUES ('burntends', 5, '19:00', '20:00');
INSERT INTO AvailableSlots VALUES ('burntends', 5, '20:00', '21:00');
INSERT INTO AvailableSlots VALUES ('burntends', 5, '21:00', '22:00');


INSERT INTO AvailableSlots VALUES ('saltedplum', 2, '18:00', '18:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 2, '19:00', '19:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 2, '20:00', '20:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 2, '21:00', '21:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 2, '22:00', '22:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 2, '23:00', '23:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 3, '18:00', '18:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 3, '19:00', '19:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 3, '20:00', '20:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 3, '21:00', '21:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 3, '22:00', '22:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 3, '23:00', '23:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 4, '18:00', '18:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 4, '19:00', '19:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 4, '20:00', '20:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 4, '21:00', '21:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 4, '22:00', '22:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 4, '23:00', '23:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 5, '18:00', '18:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 5, '19:00', '19:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 5, '20:00', '20:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 5, '21:00', '21:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 5, '22:00', '22:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 5, '23:00', '23:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 6, '18:00', '18:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 6, '19:00', '19:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 6, '20:00', '20:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 6, '21:00', '21:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 6, '22:00', '22:59');
INSERT INTO AvailableSlots VALUES ('saltedplum', 6, '23:00', '23:59');


-- Add menu items for restaurants
INSERT INTO MenuItems (username, name, type, price, description, image) VALUES ('burntends', 'King Crab served with Garlic Brown Butter', 1, 95.00, 'Top notch dish for top lads', 'https://burpple.imgix.net/foods/2d941c55e9290fd59b01800261_original.?w=645&dpr=1&fit=crop&q=80&auto=format');
INSERT INTO MenuItems (username, name, type, price, description, image) VALUES ('burntends', 'Legendary Sanger Burger', 1, 20.00, 'The iconic Burnt Ends dish', 'https://burpple-1.imgix.net/foods/2f0eab345a57cb98c9f21788723_original.?w=645&dpr=1&fit=crop&q=80&auto=format');
INSERT INTO MenuItems (username, name, type, price, description, image) VALUES ('burntends', 'Grissini', 3, 12.00, 'Slated with taramasalata', 'https://burpple-1.imgix.net/foods/2f0eab345ca17874ee321790410_original.?w=645&dpr=1&fit=crop&q=80&auto=format');
INSERT INTO MenuItems (username, name, type, price, description, image) VALUES ('burntends', 'Jamaican Chicken and Crema', 3, 10.00, 'Crispy skin with hot and tender chicken meat', 'https://burpple-3.imgix.net/foods/2fef8893350ad940c801494205_original.?w=645&dpr=1&fit=crop&q=80&auto=format');
INSERT INTO MenuItems (username, name, type, price, description, image) VALUES ('burntends', 'Eggplant and Miso', 2, 12.00, 'The iconic Burnt Ends dish', 'https://www.pepper.ph/wp-content/uploads/2017/06/BurntEdges_CI3.jpg');

INSERT INTO MenuItems (username, name, type, price, description, image) VALUES ('saltedplum', 'Burnt Chilli Chicken', 1, 10.00, 'Generous chunks of charred tender chicken', 'https://burpple-2.imgix.net/foods/23a957c29d9de24e6cc1774915_original.?w=645&dpr=1&fit=crop&q=80&auto=format');
INSERT INTO MenuItems (username, name, type, price, description, image) VALUES ('saltedplum', 'Smashed Baby Potatoes', 2, 5.00, 'Deep fried and coated with salted plum powder', 'https://burpple-2.imgix.net/foods/618e7aec94eef2e02c81633406_original.?w=645&dpr=1&fit=crop&q=80&auto=format');

-- Add bookings
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message, is_confirmed)
VALUES ('burntends', 'batman', 1, '19:00', '20:00', 1574074800000, 1, 'I am batman', true);
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message, is_confirmed)
VALUES ('burntends', 'batman', 2, '19:00', '20:00', 1574161200000, 1, 'I am batman', true);
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message, is_confirmed)
VALUES ('burntends', 'batman', 3, '19:00', '20:00', 1574247600000, 1, 'I am batman', true);
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message, is_confirmed)
VALUES ('burntends', 'batman', 4, '19:00', '20:00', 1574334000000, 1, 'I am batman', true);
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message, is_confirmed)
VALUES ('burntends', 'batman', 5, '19:00', '20:00', 1574420400000, 1, 'I am batman', true);
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message, is_confirmed)
VALUES ('burntends', 'superman', 5, '19:00', '20:00', 1574420400000, 1, 'Allergic to kryptonite', true);

INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message)
VALUES ('burntends', 'superman', 1, '20:00', '21:00', 1574074800000, 2, 'Allergic to kryptonite');
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message)
VALUES ('burntends', 'superman', 2, '20:00', '21:00', 1574161200000, 2, 'Allergic to kryptonite');
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message)
VALUES ('burntends', 'superman', 3, '20:00', '21:00', 1574247600000, 2, 'Allergic to kryptonite');
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message)
VALUES ('burntends', 'superman', 4, '20:00', '21:00', 1574334000000, 2, 'Allergic to kryptonite');
INSERT INTO Bookings (rusername, dusername, day_of_week, start_time, end_time, booking_date, pax, message)
VALUES ('burntends', 'superman', 5, '20:00', '21:00', 1574420400000, 2, 'Allergic to kryptonite');

-- Add reviews
INSERT INTO Reviews (rusername, dusername, comment, rating) VALUES ('burntends', 'batman', 'Sanger burger is to die for. Really yummy. The meat is succulent and well-seasoned. Bread is soft and melts in your mouth. The steak is pretty good as well.', 5);
INSERT INTO Reviews (rusername, dusername, comment, rating) VALUES ('burntends', 'superman', 'Finally got to try this place after a Long wait of 3 months. Tried a number of highly recommended dishes by many reviewers, including leek, beef marmalade, pulled pork sanger, hanger steak etc. Good and unique flavours, but frankly speaking most dishes were quite heavy, including this onglet steak, especially when it comes all the other goodies. How much I wish the salad is just dressed with simple light vinaigrette. Nothing particularly great compared to steaks elsewhere, so I guess if you have a regular stomach capacity, go sample more appetisers rattler than commuting yourself to this!', 5);

-- Add articles
INSERT INTO Articles (username, title, content, created_at) VALUES ('batman', 'I am batman', 'I am batman. I am batman. I am batman. I am batman. I am batman. I am batman.', 1551542400000);
INSERT INTO Articles (username, title, content, created_at) VALUES ('superman', 'I love good food.', 'There is a superhero in all of us, we just need the courage to put on the cape..', 1551628800000);

-- Add comments
INSERT INTO Comments (ausername, acreated_at, username, content) VALUES ('superman', 1551628800000, 'batman', 'I am batman.');
