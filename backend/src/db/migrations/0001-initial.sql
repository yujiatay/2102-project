CREATE TABLE Restaurants (
  username varchar(25) PRIMARY KEY,
  password text NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  name varchar(100) NOT NULL,
  cuisineType integer NOT NULL,
  branchLocation varchar(255) NOT NULL,
  openingHours varchar(255) NOT NULL,
  capacity integer NOT NULL,
  createdAt timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE Diners (
  username varchar(25) PRIMARY KEY,
  password text NOT NULL,
  email varchar(255) UNIQUE NOT NULL,
  points integer NOT NULL DEFAULT 0,
  referralCode varchar(25) UNIQUE NOT NULL,
  referrer varchar(255) REFERENCES Diners (email),
  createdAt timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE MenuItems (
  username varchar(25) REFERENCES Restaurants (username) ON UPDATE CASCADE ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  price numeric(10, 2) NOT NULL,
  description text NOT NULL,
  image varchar(255),
  createdAt timestamp NOT NULL DEFAULT NOW(),
  PRIMARY KEY (username, name)
);

CREATE TABLE AvailableSlots (
  username varchar(25) REFERENCES Restaurants (username) ON UPDATE CASCADE ON DELETE CASCADE,
  dayOfWeek integer NOT NULL,
  startTime time NOT NULL,
  endTime time NOT NULL,
  createdAt timestamp NOT NULL DEFAULT NOW(),
  PRIMARY KEY (username, dayOfWeek, startTime, endTime)
);

CREATE TABLE Tags (
  name varchar(100) PRIMARY KEY,
  createdAt timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE RestaurantTags (
  username varchar(25) REFERENCES Restaurants (username) ON UPDATE CASCADE ON DELETE CASCADE,
  tag varchar(100) REFERENCES Tags (name) ON UPDATE CASCADE ON DELETE CASCADE,
  createdAt timestamp NOT NULL DEFAULT NOW(),
  PRIMARY KEY (username, tag)
);

CREATE TABLE Vouchers (
  id integer PRIMARY KEY,
  username varchar(25) REFERENCES Restaurants (username) ON UPDATE CASCADE ON DELETE CASCADE,
  name varchar(100) NOT NULL,
  pointsRequired integer NOT NULL CHECK (pointsRequired >= 0),
  discount varchar(100) NOT NULL,
  validUntil date,
  redeemLimit integer NOT NULL,
  createdAt timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE Bookings (
  rusername varchar(25) REFERENCES Restaurants (username) ON UPDATE CASCADE ON DELETE CASCADE,
  dusername varchar(25) REFERENCES Diners (username) ON UPDATE CASCADE ON DELETE CASCADE,
  dayOfWeek integer NOT NULL,
  startTime time NOT NULL,
  endTime time NOT NULL,
  bookingDate timestamp NOT NULL,
  pax integer NOT NULL CHECK (pax > 0),
  message text,
  isConfirmed boolean DEFAULT FALSE,
  createdAt timestamp NOT NULL DEFAULT NOW(),
  PRIMARY KEY (dusername, rusername, dayOfWeek, startTime, endTime, bookingDate),
  FOREIGN KEY (rusername, dayOfWeek, startTime, endTime) REFERENCES AvailableSlots (username, dayOfWeek, startTime, endTime)
);

CREATE TABLE Bookmarks (
  dusername varchar(25) REFERENCES Diners (username) ON UPDATE CASCADE ON DELETE CASCADE,
  rusername varchar(25) REFERENCES Restaurants (username) ON UPDATE CASCADE ON DELETE CASCADE,
  createdAt timestamp NOT NULL DEFAULT NOW(),
  PRIMARY KEY (dusername, rusername)
);

CREATE TABLE Reviews (
  rusername varchar(25) REFERENCES Restaurants (username) ON UPDATE CASCADE ON DELETE CASCADE,
  dusername varchar(25) REFERENCES Diners (username),
  comment text,
  rating integer NOT NULL CHECK (rating >= 0 AND rating <= 5),
  createdAt timestamp NOT NULL DEFAULT NOW(),
  updatedAt timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE DinerVouchers (
  username varchar(25) REFERENCES Diners (username) ON UPDATE CASCADE ON DELETE CASCADE,
  vid integer REFERENCES Vouchers (id) ON UPDATE CASCADE ON DELETE CASCADE,
  redeemCode varchar(50) UNIQUE NOT NULL,
  isUsed boolean NOT NULL DEFAULT FALSE,
  createdAt timestamp NOT NULL DEFAULT NOW(),
  PRIMARY KEY (username, vid)
);

CREATE TABLE Articles (
  username varchar(25) REFERENCES Diners (username),
  title varchar(255) NOT NULL,
  content text NOT NULL,
  createdAt timestamp NOT NULL DEFAULT NOW(),
  updatedAt timestamp NOT NULL DEFAULT NOW(),
  PRIMARY KEY (username, createdAt)
);

CREATE TABLE Comments (
  ausername varchar(25) REFERENCES Diners (username),
  acreatedAt timestamp,
  username varchar(25) REFERENCES Diners (username),
  content text NOT NULL,
  createdAt timestamp NOT NULL DEFAULT NOW(),
  updatedAt timestamp NOT NULL DEFAULT NOW(),
  PRIMARY KEY (ausername, acreatedAt, username, createdAt),
  FOREIGN KEY (ausername, acreatedAt) REFERENCES Articles (username, createdAt)
);
