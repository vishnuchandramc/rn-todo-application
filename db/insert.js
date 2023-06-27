import db from './db';

export const insertTable = (data, comment, priority, isRead) => {
  return new Promise((resolve, reject) => {
    const INSERT_TABLE = `INSERT INTO todos (data, subdata, priority, isRead) VALUES (?,?,?,?)`;
    db.transaction(txn => {
      txn.executeSql(
        INSERT_TABLE,
        [data, comment, priority, isRead],
        (_, success) => {
          resolve({
            status: true,
            message: 'Data Inserted successfully',
            data: success,
          });
        },
        error => {
          reject({
            status: false,
            message: 'Failed to Insert Data',
            errorData: error,
          });
        },
      );
    });
  });
};
