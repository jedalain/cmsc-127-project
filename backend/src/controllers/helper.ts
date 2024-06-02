// this contain helper fuctions
// check existence of data
//converting key to int

import { query } from '../config/dbConfig';

// helper function to check if an ID exists in a specified table
export const checkExistence = async (table: string, column: string, value: any): Promise<boolean> => {
  const sql = `SELECT COUNT(*) as count FROM ${table} WHERE ${column} = ?`;
  const result = await query(sql, [value]);
  return result[0].count > 0;
};

// helper function to convert BigInt values to strings since nag error dahil malaki yung value ng ids natin
export const convertBigInt = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(item => {
      for (let key in item) {
        if (typeof item[key] === 'bigint') {
          item[key] = item[key].toString();
        }
      }
      return item;
    });
  } else {
    for (let key in data) {
      if (typeof data[key] === 'bigint') {
        data[key] = data[key].toString();
      }
    }
    return data;
  }
};


//helper function for recalculating average rating for:
// FOOD ESTABLISHMENTS

export const avgEstab = async (establishmentId: number) => {
  const sql = 'SELECT AVG(rating) as avgRating FROM reviews WHERE establishmentId = ? AND status != "DELETED"';
  const result = await query(sql, [establishmentId]);

  const avgRating = result[0]?.avgRating || 0;
  
  const updateSql = 'UPDATE foodEstablishments SET avgRating = ? WHERE establishmentId = ?';
  await query(updateSql, [avgRating, establishmentId]);

};



//helper function for recalculating average rating for:
// FOOD ITEMS

export const avgFoodItem = async (foodId: number) => {
  const sql = 'SELECT AVG(rating) as avgRating FROM reviews WHERE foodId = ? AND status != "DELETED"';
  const result = await query(sql, [foodId]);
  const avgRating = result[0]?.avgRating || 0;
  
  const updateSql = 'UPDATE foodItems SET avgRating = ? WHERE foodId = ?';
  await query(updateSql, [avgRating, foodId]);
};