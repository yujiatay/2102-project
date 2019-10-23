CREATE TABLE Restaurants (
  email varchar(255) PRIMARY KEY,
  username varchar(25) UNIQUE NOT NULL,
  password text NOT NULL,
  name varchar(100) NOT NULL,
  cuisineType integer NOT NULL,
  branchLocation varchar(255) NOT NULL,
  openingHours varchar(255) NOT NULL,
  capacity integer NOT NULL,
  createdAt timestamp NOT NULL
);

CREATE TABLE Diners (
  email varchar(255) PRIMARY KEY,
  username varchar(25) UNIQUE NOT NULL,
  password text NOT NULL,
  points integer NOT NULL DEFAULT 0,
  referralCode varchar(25) UNIQUE NOT NULL,
  referrer varchar(255) REFERENCES Diners (email),
  createdAt timestamp NOT NULL
);

CREATE TABLE MenuItems (
  email varchar(255) REFERENCES Restaurants (email) ON UPDATE CASCADE ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  price numeric(10, 2) NOT NULL,
  description text NOT NULL,
  image varchar(255),
  createdAt timestamp NOT NULL,
  PRIMARY KEY (email, name)
);

CREATE TABLE AvailableSlots (
  email varchar(255) REFERENCES Restaurants (email) ON UPDATE CASCADE ON DELETE CASCADE,
  dayOfWeek integer NOT NULL,
  startTime time NOT NULL,
  endTime time NOT NULL,
  createdAt timestamp NOT NULL,
  PRIMARY KEY (email, dayOfWeek, startTime, endTime)
);

CREATE TABLE Tags (
  name varchar(100) PRIMARY KEY,
  createdAt timestamp NOT NULL
);

CREATE TABLE RestaurantTags (
  email varchar(255) REFERENCES Restaurants (email) ON UPDATE CASCADE ON DELETE CASCADE,
  tag varchar(100) REFERENCES Tags (name) ON UPDATE CASCADE ON DELETE CASCADE,
  createdAt timestamp NOT NULL,
  PRIMARY KEY (email, tag)
);

CREATE TABLE Vouchers (
  id integer PRIMARY KEY,
  email varchar(255) REFERENCES Restaurants (email) ON UPDATE CASCADE ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  pointsRequired integer NOT NULL CHECK (pointsRequired >= 0),
  discount varchar(100) NOT NULL,
  validUntil date,
  redeemLimit integer NOT NULL,
  createdAt timestamp NOT NULL
);

CREATE TABLE Bookings (
  demail varchar(255) REFERENCES Diners (email) ON UPDATE CASCADE ON DELETE CASCADE,
  remail varchar(255) REFERENCES Restaurants (email) ON UPDATE CASCADE ON DELETE CASCADE,
  dayOfWeek integer NOT NULL,
  startTime time NOT NULL,
  endTime time NOT NULL,
  bookingDate date NOT NULL,
  pax integer NOT NULL CHECK (pax > 0),
  message text,
  isConfirmed boolean DEFAULT FALSE,
  createdAt timestamp NOT NULL,
  PRIMARY KEY (demail, remail, dayOfWeek, startTime, endTime, bookingDate),
  FOREIGN KEY (remail, dayOfWeek, startTime, endTime) REFERENCES AvailableSlots (email, dayOfWeek, startTime, endTime)
);

CREATE TABLE Bookmarks (
  demail varchar(255) REFERENCES Diners (email) ON UPDATE CASCADE ON DELETE CASCADE,
  remail varchar(255) REFERENCES Restaurants (email) ON UPDATE CASCADE ON DELETE CASCADE,
  createdAt timestamp NOT NULL,
  PRIMARY KEY (demail, remail)
);

CREATE TABLE Reviews (
  demail varchar(255) REFERENCES Diners (email),
  remail varchar(255) REFERENCES Restaurants (email) ON UPDATE CASCADE ON DELETE CASCADE,
  comment text,
  rating integer NOT NULL CHECK (rating >= 0 AND rating <= 5),
  createdAt timestamp NOT NULL,
  updatedAt timestamp NOT NULL
);

CREATE TABLE DinerVouchers (
  email varchar(255) REFERENCES Diners (email) ON UPDATE CASCADE ON DELETE CASCADE,
  vid integer REFERENCES Vouchers (id) ON UPDATE CASCADE ON DELETE CASCADE,
  redeemCode varchar(50) UNIQUE NOT NULL,
  isUsed boolean NOT NULL DEFAULT FALSE,
  createdAt timestamp NOT NULL,
  PRIMARY KEY (email, vid)
);

CREATE TABLE Articles (
  email varchar(255) REFERENCES Diners (email),
  title varchar(255) NOT NULL,
  content text NOT NULL,
  createdAt timestamp NOT NULL,
  updatedAt timestamp NOT NULL,
  PRIMARY KEY (email, createdAt)
);

CREATE TABLE Comments (
  email varchar(255) REFERENCES Diners (email),
  acreatedAt timestamp,
  content text NOT NULL,
  createdAt timestamp NOT NULL,
  updatedAt timestamp NOT NULL,
  PRIMARY KEY (email, acreatedAt, createdAt),
  FOREIGN KEY (email, acreatedAt) REFERENCES Articles (email, createdAt)
);
