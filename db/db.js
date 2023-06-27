import sqlite from 'react-native-sqlite-storage';

export default db = sqlite.openDatabase(
  {
    name: 'rn_sqlite',
  },
  res => {
    console.log('Successfully populated the database => ', res);
  },
  error => {
    console.log('Unable to populate database ', error);
  },
);
