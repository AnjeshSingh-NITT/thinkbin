 import express from "express";
 import dotenv from "dotenv";
 import cors from "cors";

 import notesRoutes from "./routes/notesRoutes.js";
 import {connectDB} from "./config/db.js";
 import rateLimiter from "./middleware/rateLimiter.js";

 dotenv.config();

 const app = express();
 const PORT = process.env.PORT || 5001;


 //middleware
 app.use(cors(
 {
   origin: "http://localhost:5173",
 }
 ));
 app.use(express.json());  // helps parse JSON bodoes : req.body
 app.use(rateLimiter);


//  simple custom middleware to log request method and URL
//   app.use((req,res,next) => {
//       console.log(`Req method is ${req.method} and URL is ${req.url}`);
//       next();
//  });

 app.use("/api/notes", notesRoutes);

 
 connectDB().then(() => {
      app.listen(PORT, () => {
      console.log("Server started on PORT: ",PORT);
   });
 });
 

