import app from "./app";
import { config } from "./config/config";

function startServer() {
    const port = config.port;

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

startServer();