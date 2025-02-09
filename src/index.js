// require('dotenv').config({path: './env'})  //this is to load the environment variables from the .env file but we don't do this is in our code because we use module and it doesn't look good to use imports and somewhere require so we use different approch to load the environment variables
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})

connectDB()
















// import express from "express"
// const app = express()
// ;( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//         app.on("error", (error)=>{
//             console.log("Error: ", error)
//             throw error
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`Server is running on port ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("Error: ", error)
//         throw error
//     }
// })()