CREATE TABLE users
(
  id SERIAL,
  email character(26),
  password character(250),
  phone character(15),
  "firstName" character varying(26),
  "lastName" character(26),
  address text,
  city text,
  profile text,
  "createdAt" timestamp with time zone,
  "zipCode" character varying(15),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- Table: public.rideoffers

-- DROP TABLE public.rideoffers;

CREATE TABLE rideoffers
(
  id SERIAL,
  "rideTitle" character varying(50),
  location character varying(25),
  destination character varying(25),
  "departureTime" date,
  "noOfSeats" integer,
  "createdAt" timestamp without time zone,
  "rideOwnerId" integer,
  CONSTRAINT rideoffers_pkey PRIMARY KEY (id)
);

CREATE TABLE riderequests
(
  id SERIAL,
  "rideId" integer,
  "passengerId" integer,
  status text,
  "rideOwnerId" integer,
  CONSTRAINT riderequests_pkey PRIMARY KEY (id),
  CONSTRAINT "riderequests_rideId_fkey" FOREIGN KEY ("rideId")
      REFERENCES public.rideoffers (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);


-- create users
INSERT INTO users (email, password, phone, "firstName", "lastName", address, city, "createdAt", "zipCode") 
VALUES ('joeokpus@gmail.com', '$2a$08$KXYdOZAMdcDW8Ef8RCKZAeDJnMPZaCSk1JbRjlQXX1oA69ZyciytG', '08032417790', 'joe', 'easy', '42, montgomery rd', 'yaba', 'NOW()', '331107');

INSERT INTO users (email, password, phone, "firstName", "lastName", address, city, "createdAt", "zipCode") 
VALUES ('jehonadabokpus@gmail.com', '$2a$08$KXYdOZAMdcDW8Ef8RCKZAeDJnMPZaCSk1JbRjlQXX1oA69ZyciytG', '07059972180', 'jehonadab', 'okpukoro', '42, montgomery rd', 'yaba', 'NOW()', '331107');

INSERT INTO users (email, password, phone, "firstName", "lastName", address, city, "createdAt", "zipCode") 
VALUES ('joejackson045@gmail.com', '$2a$08$KXYdOZAMdcDW8Ef8RCKZAeDJnMPZaCSk1JbRjlQXX1oA69ZyciytG', '07059972180', 'jehonadab', 'okpukoro', '42, montgomery rd', 'yaba', 'NOW()', '331107');


INSERT INTO rideoffers ("rideTitle", location, destination, "departureTime", "noOfSeats", "createdAt")
 VALUES ('Heading towards mile 2',	'Yaba', 	'Mile 2', '10-12-2017', 2, 'NOW()');

INSERT INTO rideoffers ("rideTitle", location, destination, "departureTime", "noOfSeats", "createdAt")
 VALUES ('Heading towards computer vaillage',	'Yaba', 	'Ikeja', '10-12-2017', 2, 'NOW()');

INSERT INTO rideoffers ("rideTitle", location, destination, "departureTime", "noOfSeats", "createdAt")
 VALUES ('Heading towards yaba',	'Computer village', 	'Yaba', '10-12-2017', 2, 'NOW()');



INSERT INTO riderequests ("rideId", "passengerId", status, "rideOwnerId") 
 VALUES (2,	1, 	'pending', 15);

 INSERT INTO riderequests ("rideId", "passengerId", status, "rideOwnerId") 
 VALUES (1,	2, 	'pending', 15);

INSERT INTO riderequests ("rideId", "passengerId", status, "rideOwnerId") 
 VALUES (3,	1, 	'pending', 15);
 