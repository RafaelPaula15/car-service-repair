\c car-services

DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    id serial PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    phone text,
    car_model text NOT NULL,
    license_plate text NOT NULL,
    notes text DEFAULT '' NOT NULL
);

CREATE TABLE services (
    id serial PRIMARY KEY,
    customer_id integer NOT NULL REFERENCES customers ON DELETE CASCADE,
    date_time timestamp without time zone NOT NULL,
    services_needed text NOT NULL
);

INSERT INTO customers (first_name, last_name, phone, car_model, license_plate)
   VALUES ('Olive', 'Yew', '+44 7700 900163', '2001 Honda Accord', '00~HT'),  
          ('Aida', 'Bugg', '+44 7700 900476', '2013 Toyota Camry', '00~00'),  
          ('Teri', 'Dactyl', '+44 7700 900600', '2010 honda pilot', '00~ANY'),  
          ('Peg', 'Legge', '+44 7700 900359', '2019 Honda Accord', 'TX~ANY'),  
          ('Allie', 'Grater', '+44 7700 900284', '2017 Toyota Camry', 'ANY~TX'),  
          ('Liz', 'Erd', '+44 7700 900804', '2018 nissan rogue', 'HT~ANY'),  
          ('Constance', 'Noring', '+44 7700 900358', '2015 Honda Civic', '00~11'),  
          ('Ty', 'Ayelloribbin', '+44 7700 900210', '2018 nissan sentra', '000~1'),  
          ('Percy', 'Vere', '+44 7700 900076', '2011 Toyota Corolla', 'ANY`0'),  
          ('Jack', 'Aranda', '+44 7700 900519', '2005 Honda Accord', 'ANY~1'),  
          ('John', 'Quil', '+44 7700 900407', '2010 Honda Civic', '11~1'),  
          ('Ginger', 'Plant', '+44 7700 900402', '2016 Toyota Corolla', '22~111'),  
          ('Del', 'Phineum', '+44 7700 900214', '2010 Toyota Camry', '000~2'),  
          ('Rose', 'Bush', '+44 7700 900821', '2011 Honda Civic', '222~ANY'),  
          ('Perry', 'Scope', '+44 7700 900102', '2013 nissan rogue', '22~0'),  
          ('Pat', 'Thettick', '+44 7700 900800', '2013 Toyota Corolla', 'ZZ~ZZ'),  
          ('Frank N.', 'Stein', '+44 7700 900438', '2018 Honda Accord', 'Z~11'),  
          ('Percy', 'Kewshun', '+44 7700 900144', '2017 nissan rogue', 'Z~22'),  
          ('Rod', 'Knee', '+44 7700 900276', '2016 Toyota Camry', 'ZZZ`1'),  
          ('Hank R.', 'Cheef', '+44 7700 900283', '2015 nissan sentra', 'ZZH~0'),  
          ('Bridget', 'Theriveaquai', '+44 7700 900861', '2013 honda pilot', 'ZXZ~Z'),  
          ('Pat N.', 'Toffis', '+44 7700 900340', '2008 Toyota Corolla', '0~Z'),  
          ('Karen', 'Onnabit', '+44 7700 900482', '2014 nissan sentra', 'Y~11'),  
          ('Col', 'Fays', '+44 7700 900282', '2019 Toyota Corolla', 'YY~00'),  
          ('Fay', 'Daway', '+44 7700 900416', '2015 honda pilot', 'YYZ~0'),  
          ('Colin', 'Sik', '+44 7700 900171', '2013 Honda Civic', 'Y~000'),  
          ('Greg', 'Arias', '+44 7700 900472', '2017 Toyota Camry', 'Y~111');

          