import { DB_URI, PORT } from "./config/env.config.js";
import app from "./app.js";
import connectToDatabase from "./config/db.config.js";

connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port https://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to start the server:", error);
    });

app.get("/", (req, res) => {
    res.send("ChatWise Backend is running");
});
