import express from 'express';
import cors from 'cors';
import { connectToDatabase } from "./services/database.service"
import { eventRouter } from "./routes/events.router";

const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase()
    .then(() => {
        app.use("/events", eventRouter);
        const port = 8080;
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

// // fake data
// import Chance from 'chance';
// const chance = new Chance();

// const events = [...Array(250).keys()].map(id=>{
//     return {
//         id,
//         type: chance.address(),
//         date: chance.date(),
//         name: chance.name(),
//         age: chance.age(),
//     }
// });
