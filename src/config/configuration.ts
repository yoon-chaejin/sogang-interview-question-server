export default () => ({
    port: 3101,
    database: {
        type: 'mariadb',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT),
        host: process.env.DB_HOST,
        database: process.env.DB_SCHEMA,
        synchronize: false,
        entities: ['dist/**/*.entity{.ts,.js}'],
    },
    secret: process.env.JWT_SECRET,
    nodemailer: {
        user: process.env.NODEMAILER_USER,
        password: process.env.NODEMAILER_PASSWORD,
    },
    url: process.env.API_BASE_URL,
})