# TasteTracker
This information system allows users to record, in electronic form, data on food reviews and food items from food establishments. It features comprehensive management of food reviews, food establishments, and food items. Users can add, delete, view, and update reviews, establishments, and items. This website was created by a group of undergraduate students for the University of the Philippines - Los Baños CMSC 127 (File Processing and Database Systems) course project.

### Developers (TEAM TININIW)
- Aguinaldo, Alexis Danielle
- Silva, Jed Alain
- Victorio, Jean Nikolai
- Zamora, Aaron

## Tech Stack
- MariaDB
- ExpressJS
- NodeJS
- React with Vite
- Tailwind
- Typescript

### Usage Guidelines
- Already have an account?
    - Select the "Sign In" button located on the top right of the landing page.
    - Enter you rcredentials
    - Once done, click the "Sign in" button to and explore the website.
- If you don't have an account
    - Click the "Sign up" button and fill up the required fields.
    - double check your input and click "Create Account" Button

### How to Run
To run this project, open MariaDB and connect to the database: 127project.
- If you don't have the databse on your device, make sure to Install the 127project database in your MariaDB system.
    -  Login as root user in MariaDB and run the downloaded projectDB.sql file
        $ mysql -u root -p
        Enter password: <password here>
        MariaDB [(none)]> source projectDB.sql

After that, open your terminal (or any IDE) and make sure that you are in the root directory (CMSC-127-PROJECT). If so, do the following:

1. For the server, go to the directory 'backend' and install the nodeJS packages.
```bash
  cd backend
  npm i
```
3. Run the server.
```bash
  npm start
```
4. Open another terminal and redirect to the frontend folder.
```bash
  cd frontend
  npm i
```
5. Run the client.
```bash
  npm run dev
```
6. Hold the CTRL key and click the link 'http://localhost:5173/' to open the website.


### Project Features
1. Add, delete, view, and update a food review (on a food establishment or a food item);
2. Add, delete, search, view, and update a food establishment;
3. Add, delete, search, view, and update a food item.
4. User sign in
5. User sign up
6. User authentication

### Reports to be generated
1. View all food establishments;
2. View all food reviews for an establishment or a food item;
3. View all food items from an establishment;
4. View all food items from an establishment that belong to a food type {meat | veg | etc.};
5. View all reviews made within a month for an establishment or a food item;
6. View all establishments with a high average rating (rating >= 4). (ratings from 1-5; highest is 5);
7. View all food items from an establishment arranged according to price;
8. Search food items from any establishment based on a given price range and/or food type.
