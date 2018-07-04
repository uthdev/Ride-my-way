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
  "startsAt" timestamp without time zone,
  "expiresAt" timestamp without time zone,
  "rideOwnerId" integer,
  CONSTRAINT rideoffers_pkey PRIMARY KEY (id)
);

CREATE TABLE riderequests
(
  id SERIAL,
  "rideId" integer,
  "noOfSeats" integer,
  "passengerId" integer[],
  "noOfSeatsLeft" integer,
  CONSTRAINT riderequests_pkey PRIMARY KEY (id),
  CONSTRAINT "riderequests_rideId_fkey" FOREIGN KEY ("rideId")
      REFERENCES rideoffers (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);