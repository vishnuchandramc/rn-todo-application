import db from './db';

export default createTable = () => {
  db.transaction(txn => {
    txn.executeSql(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data VARCHAR(20),
        subdata VARCHAR(50),
        priority TEXT,
        isRead INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      `,
      [],
      (sqlTxn, res) => {
        console.log('Table Created Successfully!');
      },
      error => {
        console.log('Query error on table creation', error);
      },
    );
  });
};
