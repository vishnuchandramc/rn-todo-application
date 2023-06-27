import db from './db';

export const retriveData = setData => {
  db.transaction(txn => {
    txn.executeSql(
      `SELECT * FROM todos ORDER BY id DESC`,
      [],
      (sqlTxn, res) => {
        console.log('Data Retrived Successfully!');
        let len = res.rows.length;
        if (len > 0) {
          let result = [];
          for (let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            result.push({
              id: item.id,
              data: item.data,
              subdata: item.subdata,
              priority: item.priority,
              date: item.timestamp,
              isDone: item.isRead,
            });
          }
          setData(result);
        } else {
          setData([]);
        }
      },
      error => {
        console.log('Query error on table creation', error);
      },
    );
  });
};
