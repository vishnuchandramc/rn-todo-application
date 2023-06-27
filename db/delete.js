import db from './db';

export const deleteTableItems = item => {
  return new Promise((resolve, reject) => {
    const DELETE_TABLE_ITEMS = `DELETE FROM todos WHERE id==?`;
    db.transaction(txn => {
      txn.executeSql(
        DELETE_TABLE_ITEMS,
        [item],
        (_, success) => {
          resolve({
            status: true,
            message: 'Data Deleted successfully',
            data: success,
          });
        },
        error => {
          reject({
            status: false,
            message: 'Failed to Delete Data',
            errorData: error,
          });
        },
      );
    });
  });
};

export const deleteAllItems = () => {
  return new Promise((resolve, reject) => {
    const DELETE_TABLE_ITEMS = `DELETE FROM todos`;
    db.transaction(txn => {
      txn.executeSql(
        DELETE_TABLE_ITEMS,
        [],
        (_, success) => {
          resolve({
            status: true,
            message: 'Data Deleted successfully',
            data: success,
          });
        },
        error => {
          reject({
            status: false,
            message: 'Failed to Delete Data',
            errorData: error,
          });
        },
      );
    });
  });
};
