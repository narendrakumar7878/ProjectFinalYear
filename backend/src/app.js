import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

import mongoose from "mongoose";
import { connect } from "node:http2";
import  connectToSocket  from "./controllers/socketManger.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

// app.get("/home", (req, res) => {
//     return res.json({ "hello": "world" })
// })

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://narendraindian7878:narendra@cluster0.zjf90.mongodb.net/")
    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("listing on port 8000");
    });
}
start();
















// import express from "express";
// import { createServer } from "node:http";
// import { Server } from "socket.io";
// import mongoose from "mongoose";
// import cors from "cors";
// import userRoutes from "./routes/users.routes.js";
// import  connectToSocket  from "./controllers/socketManger.js";  // Corrected import

// const app = express();
// const server = createServer(app);
// const io = connectToSocket(server);  // Assuming you are setting up socket.io properly

// // Setting the port
// app.set("port", process.env.PORT || 8000);

// // Middleware setup
// app.use(cors());
// app.use(express.json({ limit: "40kb" }));
// app.use(express.urlencoded({ limit: "40kb", extended: true }));

// // Routes setup
// app.use("/api/v1/users", userRoutes);

// // MongoDB URI Setup
// const uri = "mongodb+srv://narendra:narendra@9090@cluster0.zjf90.mongodb.net/"; // Replace 'myDatabase' with actual database name

// const start = async () => {
//     try {
//         // MongoDB connection
//         const connectionDb = await mongoose.connect(uri);
//         console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

//         // Start server
//         server.listen(app.get("port"), () => {
//             console.log("Listening on port 8000");
//         });
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// };

// start();
