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

CREATE TABLE rideoffers
(
  id SERIAL,
  "rideTitle" character varying(50),
  location character varying(25),
  destination character varying(25),
  "departureTime" date,
  "rideOwnerId" integer,
  "noOfSeats" integer,
  CONSTRAINT rideoffers_pkey PRIMARY KEY (id),
  CONSTRAINT "rideoffers_rideOwner_fkey" FOREIGN KEY ("rideOwnerId")
      REFERENCES users (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);