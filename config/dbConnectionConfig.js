const mongoose = require('mongoose');
const dbConnection=async()=>{
    try {
        const conn=await mongoose.connect(process.env.connectionString);
        console.log(`MongoDB Connected : ${conn.connection.host}, ${conn.connection.name}`);
        
    } catch (error) {
        console.log(`Failed to connect to db : ${error.message}`);
        process.exit(1);
    }
}
module.exports=dbConnection;