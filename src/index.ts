import app from "./app";
import config from "./config/config";
import connectDB from "./config/db";

async function startServer() {
    await connectDB();

    const port = config.port;

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

startServer();