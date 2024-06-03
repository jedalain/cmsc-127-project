# CMSC 100 Final Project

### Developers
- TEAM TININIW
    - Zamora, Aaron
    - Silva, Jed Alain
    - Victorio, Jean Nikolai
    - Aguinaldo, Alexis Danielle

### Project Title
TasteTracker

### Project Description
This information system will allow us to record, in electronic form, data on food reviews
and food items from food establishments. The developers built this website using MERN (MariaDB instead of Mongoose) stack to create a robust web application mainly using TypeScript.

### Project Features
1. Add, update, and delete a food review (on a food establishment or a food item);
2. Add, delete, search, and update a food establishment;
3. Add, delete, search, and update a food item.


### Reports to be generated
1. View all food establishments;
2. View all food reviews for an establishment or a food item;
3. View all food items from an establishment;
4. View all food items from an establishment that belong to a food type {meat | veg | etc.};
5. View all reviews made within a month for an establishment or a food item;
6. View all establishments with a high average rating (rating >= 4). (ratings from 1-5; highest is 5);
7. View all food items from an establishment arranged according to price;
8. Search food items from any establishment based on a given price range and/or food type.

### Usage Guidelines
- How do I create an account?
    - Select the "Sign In" button located on the top right of the landing page.
    - If you have an account:
        -  Enter you rcredentials
        - Once done, click the "Sign in" button to proceed.
    - if you don't have an account
        - Click the "Sign up" button and fill up the required field.
        - double check your input and click "Create Account" Button 

### How to Run
To run this project, open MariaDB and connect to the database: 127project.
- If you don't have the databse on your device, make sure to Install the 127project database in your MariaDB system.
    -  Login as root user in MariaDB and run the downloaded projectDB.sql file
        $ mysql -u root -p
        Enter password: <password here>
        MariaDB [(none)]> source projectDB.sql


After that, open your terminal make sure that you are in the right directory, navigate to the backend and frontend folder, and type in the following commands:

in the cmsc-127-project folder

```
npm i 

```

in the backend folder:

```
npm start

```

in the frontend folder:

```
npm run dev

```

This will you redirect you to the landing page of this project.

