import { query } from './dbConfig.ts'; 

const testDbConnection = async () => {
  try {
    // Query to fetch database version
    const result = await query('SELECT VERSION()');
    console.log('Database version:', result);
    
    // Example query to fetch data from a known table
    const testQuery = 'SELECT * FROM foodEstablishments LIMIT 1';
    const testResult = await query(testQuery);
    console.log('Test query result:', testResult);

    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

// Run the test
testDbConnection();
