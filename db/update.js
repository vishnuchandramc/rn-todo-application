import db from './db';

export const updateTable = (item, id) => {
  return new Promise((resolve, reject) => {
    const UPDATE_TABLE = `UPDATE todos SET isRead=? WHERE id=?`;
    db.transaction(txn => {
      txn.executeSql(
        UPDATE_TABLE,
        [item, id],
        (_, success) => {
          resolve({
            status: true,
            message: 'Data updated successfully',
            data: success,
          });
        },
        error => {
          reject({
            status: false,
            message: 'Failed to update Data',
            errorData: error,
          });
        },
      );
    });
  });
};
