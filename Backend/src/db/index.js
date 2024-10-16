import mysql from "mysql2/promise"

let connection;

const connectDB = async () => {
    if(!connection){
        try {
            connection =  await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME 
            });
            console.log(`\nMySQL connected !!`);
        }catch(error){
            console.log("MySQL connection failed ", error);
            process.exit(1);
        }
    }

    return connection;
}


export default connectDB;