// require('dotenv').config({path: './env'})  //this is to load the environment variables from the .env file but we don't do this is in our code because we use module and it doesn't look good to use imports and somewhere require so we use different approch to load the environment variables
// Import the dotenv package to load environment variables from the .env file
import dotenv from "dotenv";
import { app } from "./app.js";

// Import the function that connects to the MongoDB database
import connectDB from "./db/index.js";

// Load environment variables from the .env file
dotenv.config({
    path: "./.env"  // Specify the path to the .env file
});

// Call the function to connect to MongoDB
connectDB()
    .then(() => { // If the database connection is successful, run this block

        // Handle any application-level errors
        app.on("error", (error) => {
            console.log("Error:", error); // Log the error
            throw error; // Throw the error to stop execution
        });

        // Start the server on the specified port
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`); // Log the running server
        });
    })
    .catch((err) => { // If there is an error connecting to MongoDB, run this block
        console.log("MONGO DB connection failed !!!", err); // Log the error
    });

















// Import express framework
// import express from "express"

// Create an Express app
// const app = express()

// Immediately Invoked Async Function Expression (IIFE) to connect to MongoDB and start the server
// ;( async () => {
//     try {
//         // Connect to MongoDB using environment variable for the URI and database name
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)

//         // Handle application-level errors
//         app.on("error", (error) => {
//             console.log("Error: ", error) // Log the error
//             throw error // Throw the error to stop execution
//         })

//         // Start the server on the specified port
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`) // Log the running server
//         })
//     } catch (error) { // Catch any errors that occur
//         console.error("Error: ", error) // Log the error
//         throw error // Throw the error to stop execution
//     }
// })()
