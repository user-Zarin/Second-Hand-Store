import mysql from "mysql2";
export const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Ayman@2004',
    database: 'secondhand-store'
});

db.connect((err) => {
    if (err) {
        console.log('error',err.message);
    } else {
        console.log('Database connected successfully');
    }
});

export default db