import { config as conf } from "dotenv";
conf();

const _config = {
    port: process.env.PORT,
    mongodb: {
        connection_string: process.env.MONGODB_CONNECTION_STRING,
        db_name: process.env.MONGODB_DB_NAME,
    }

}

export default Object.freeze(_config);