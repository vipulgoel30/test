declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            NODE_ENV: string;
            IP: string;
            PORT: string;
            LOG_LEVEL: string;
            DB_HOST: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            DB_PORT: string;
        }
    }
}

export { };
