import express, { urlencoded } from 'express';
import router from './routes/router';
import { dbConfig } from './config/dbConfig';

// test connection
async function testDatabaseConnection() {
  try {
    const connection = await dbConfig.getConnection();
    console.log('Connected to the database.');
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

// Call the function to test the connection
testDatabaseConnection();

// entry point
const app = express();
app.use(express.json());
app.use(urlencoded(
  {
    extended: false
  }
));

// routes
router(app);

app.listen(8000, () => {
  console.log("Server started on port 8000");
})

// Handle unexpected errors
process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err);
  process.exit(1); 
});
