// this contain helper fuctions
// check existence of data

import { query } from '../config/dbConfig';

// helper function to check if an ID exists in a specified table
export const checkExistence = async (table: string, column: string, value: any): Promise<boolean> => {
  const sql = `SELECT COUNT(*) as count FROM ${table} WHERE ${column} = ?`;
  const result = await query(sql, [value]);
  return result[0].count > 0;
};

// helper function to convert BigInt values to strings since nag error siya siguro kasi thousand id natin
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
