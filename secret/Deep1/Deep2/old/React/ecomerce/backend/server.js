const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv')

// Handle Uncaught Expections
process.on('uncaughtException', err =>{
    console.log(`ERROR: ${err.message}`)
    console.log('Shutting down server due to uncaught exception')
    process.exit(1)
})

// Setting up config file
dotenv.config({ path: 'backend/config/config.env' })



// Connecting to Databse
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`) 
    
})