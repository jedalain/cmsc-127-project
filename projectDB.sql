-- Drop and create the database
DROP DATABASE IF EXISTS 127project;
CREATE DATABASE IF NOT EXISTS 127project;
GRANT ALL ON 127project.* TO adminProject@localhost IDENTIFIED BY '127project';
USE 127project;

-- create the users table
CREATE TABLE IF NOT EXISTS users (
    userId INT(4) NOT NULL AUTO_INCREMENT,
    email VARCHAR(25) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fname VARCHAR(25) NOT NULL,
    mname VARCHAR(25),
    lname VARCHAR(25) NOT NULL,
    role VARCHAR(25) NOT NULL,
    PRIMARY KEY(userId)
);

-- insert data into users table
INSERT INTO users (userId, role, email, password, fname, mname, lname) VALUES
    (1, 'owner', 'mbanks@gmail.com', 'malcombanks', 'Malcom', NULL, 'Banks'),
    (2, 'user', 'ccwilder@protonmail.com', 'cathywilder', 'Catherine', 'Crystal', 'Wilder'),
    (3, 'user', 'pzaiken@protonmail.com', 'paulzimmer', 'Paul', 'Zimmer', 'Aiken'),
    (4, 'owner', 'kenhartel@gmail.com', 'kenhartel', 'Kendrick', NULL, 'Hartel'),
    (5, 'owner', 'tate_toon@gmail.com', 'lilytate', 'Lilian', 'Hayes', 'Tate'),
    (6, 'admin', 'admin@gmail.com', '127admin', 'Admin', NULL, 'Moderator');


-- create the foodEstablishments table
CREATE TABLE IF NOT EXISTS foodEstablishments (
    establishmentId INT(4) NOT NULL AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    address VARCHAR(255) NOT NULL,
    avgRating DECIMAL(3,2) NOT NULL DEFAULT 0.00, -- default to zero because computation
    userId INT(4) NOT NULL, -- will determine kung sino ang owner
    PRIMARY KEY(establishmentId),    
    CONSTRAINT foodEstab_fk FOREIGN KEY (userId) REFERENCES users(userId)
);

-- insert data into foodEstablishments table
-- userId here should be userId ng mga owner lang
-- average rating should be based on rating given by user
INSERT INTO foodEstablishments (establishmentId, name, address, userId) VALUES
    (1000, 'DoMac', 'Vega Arcade', 1),
    (1001, 'Burger Queen', 'Star Plaza', 1),
    (1002, 'Pizza Palace', 'King Street', 4),
    (1003, 'Taco Town', 'Queen Avenue', 4),
    (1004, 'Sushi Central', 'Main Boulevard', 5);



-- create the foodItems table
CREATE TABLE IF NOT EXISTS foodItems (
    foodId INT(4) NOT NULL AUTO_INCREMENT,
    classification VARCHAR(25) NOT NULL,
    name VARCHAR(25) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    avgRating DECIMAL(3,2) NOT NULL DEFAULT 0.00, -- default to zero because computation
    establishmentId INT(4),
    PRIMARY KEY(foodId),
    CONSTRAINT foodItems_fk FOREIGN KEY(establishmentId) REFERENCES foodEstablishments(establishmentId) ON DELETE CASCADE
);

-- insert data into foodItems table
INSERT INTO foodItems (price, name, classification, establishmentId) VALUES
    (8.99, 'Burger', 'MEAT', 1000),
    (12.99, 'Pizza', 'MEAT_AND_VEGGIES', 1002),
    (5.99, 'Taco', 'MEAT_AND_VEGGIES', 1003),
    (15.99, 'Sushi', 'MEAT_AND_VEGGIES', 1004),
    (6.99, 'Fries', 'VEGGIES', 1001),
    (9.99, 'All Meat Shawarma', 'MEAT', 1000),
    (7.99, 'Veggie Wrap', 'MEAT_AND_VEGGIES', 1002),
    (11.99, 'Salad', 'VEGGIES', 1003),
    (3.99, 'Soda', 'BEVERAGES', 1004),  
    (2.99, 'Ice Cream', 'DAIRY_PRODUCTS', 1000),
    (4.99, 'Coffee', 'DAIRY_PRODUCTS', 1001), -- dairy_product due to milk/cream content
    (12.49, 'Pasta', 'MEAT_AND_VEGGIES', 1002),
    (5.49, 'Sandwich', 'MEAT_AND_VEGGIES', 1003),
    (14.99, 'Roll', 'MEAT_AND_VEGGIES', 1004),
    (8.49, 'Nuggets', 'MEAT', 1000),
    (13.99, 'Carbonara', 'MEAT_AND_VEGGIES', 1002),
    (9.49, 'Chicken Joy', 'MEAT', 1003),
    (1.99, 'Orange Juice', 'BEVERAGES', 1004);  



-- create the reviews table
CREATE TABLE IF NOT EXISTS reviews (
    reviewId INT(6) NOT NULL AUTO_INCREMENT,
    status VARCHAR(25) NOT NULL, -- action created by user (CRUD) prev type
    rating INT(6) NOT NULL,
    title VARCHAR(25) NOT NULL,
    comment VARCHAR(255) NOT NULL,
    dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    dateModified DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId INT(4) NOT NULL,
    establishmentId INT(4),
    foodId INT(4),
    PRIMARY KEY(reviewId),
    CONSTRAINT reviewUser_fk FOREIGN KEY(userId) REFERENCES users(userId),
    CONSTRAINT reviewEstab_fk FOREIGN KEY(establishmentId) REFERENCES foodEstablishments(establishmentId) ON DELETE CASCADE,
    CONSTRAINT reviewFood_fk FOREIGN KEY(foodId) REFERENCES foodItems(foodId) ON DELETE CASCADE
);

-- insert data into reviews table
INSERT INTO reviews (comment, rating, title, status, userId, establishmentId, foodId) VALUES
    ('Great food!', 4, 'Delicious', 'CREATED', 2, 1000, NULL), -- estab
    ('Good value for money.', 4, 'Affordable', 'CREATED', 2, NULL, 6), -- food
    ('Amazing pizza!', 5, 'Best Pizza', 'CREATED', 3, 1002, NULL), -- estab
    ('Tacos were okay.', 3, 'Average', 'DELETED', 3, 1003, NULL), -- estab
    ('Sushi was fantastic.', 4, 'Great Sushi', 'CREATED', 3, NULL, 4), -- food
    ('Burger was a bit dry.', 3, 'Dry Burger', 'CREATED', 2, NULL, 6), -- food
    ('Loved the fries!', 4, 'Yummy Fries', 'CREATED', 3, NULL, 5), -- food
    ('Pizza toppings were fresh.', 4, 'Fresh Toppings', 'CREATED', 3, 1002, NULL), -- estab
    ('Tacos were spicy!', 4, 'Spicy', 'UPDATED', 2, NULL, 3),-- food
    ('Great ambiance.', 4, 'Nice Place', 'DELETED', 2, 1004, NULL), -- estab
    ('Loved the customer service.', 4, 'Friendly Staff', 'CREATED', 3, 1000, NULL), -- estab
    ('Sushi was not fresh.', 2, 'Not Fresh', 'CREATED', 3, NULL, 4); --food

UPDATE foodItems fi
JOIN (
    SELECT foodId, AVG(rating) AS avgRating
    FROM reviews
    WHERE foodId IS NOT NULL
    GROUP BY foodId
) r ON fi.foodId = r.foodId
SET fi.avgRating = r.avgRating;


UPDATE foodEstablishments fe
JOIN (
    SELECT establishmentId, AVG(rating) AS avgRating
    FROM reviews
    WHERE establishmentId IS NOT NULL
    GROUP BY establishmentId
) r ON fe.establishmentId = r.establishmentId
SET fe.avgRating = r.avgRating;
    


/*
ON DELETE CASCADE 
    - delete the rows from the child table automatically, when the rows from the parent table are deleted.

  https://www.geeksforgeeks.org/mysql-on-delete-cascade-constraint/



MANUAL QUERY TO UPDATE AVERAGE RATING ON FOOD ESTAB

UPDATE foodEstablishments fe
JOIN (
    SELECT establishmentId, AVG(rating) AS avgRating
    FROM reviews
    WHERE establishmentId IS NOT NULL
    GROUP BY establishmentId
) r ON fe.establishmentId = r.establishmentId
SET fe.avgRating = r.avgRating;


MANUAL QUERY TO UPDATE AVERAGE RATING ON FOOD ITEM

UPDATE foodItems fi
JOIN (
    SELECT foodId, AVG(rating) AS avgRating
    FROM reviews
    WHERE foodId IS NOT NULL
    GROUP BY foodId
) r ON fi.foodId = r.foodId
SET fi.avgRating = r.avgRating;



*/


