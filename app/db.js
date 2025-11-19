const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,        // mysql
  port: process.env.DB_PORT,        // 3306
  user: process.env.DB_USER,        // depuis le Secret
  password: process.env.DB_PASSWORD,// depuis le Secret
  database: process.env.DB_NAME     // ma_base
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
    return;
  }
  console.log('Connecté à MySQL !');
});
