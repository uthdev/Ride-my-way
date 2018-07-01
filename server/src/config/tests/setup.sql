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