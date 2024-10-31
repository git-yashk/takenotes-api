import { config as conf } from "dotenv";
conf();

const _config = {
    port: process.env.PORT,
    mongodb: {
        connection_string: process.env.MONGODB_CONNECTION_STRING,
        db_name: process.env.MONGODB_DB_NAME,
    },
    token: {
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        access_token_expiry: process.env.ACCESS_TOKEN_EXPRIY,
        refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
        refresh_token_expiry: process.env.REFRESH_TOKEN_EXPIRY,
    }

}

export default Object.freeze(_config);