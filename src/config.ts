const config = {
    env: process.env.NODE_ENV || "development",
    port: parseInt(process.env.PORT || "3000"),
    logLevel: process.env.LOG_LEVEL || "info",
    db: process.env.DATABASE_URL,
    appSecretKey: process.env.SESSION_SECRET
}

export default config;