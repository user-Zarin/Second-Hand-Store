import mysql from "mysql2";
 const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'secondhand-store'
});

db.connect((err) => {
    if (err) {
        console.log('error');
    } else {
        console.log('Database connected successfully');
    }
});

export default db