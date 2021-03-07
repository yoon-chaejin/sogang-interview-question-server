import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const config: TypeOrmModuleOptions = {
    type: 'mariadb',
    username: 'root',
    password: 'interviewquestion123!',
    port: 3306,
    host: '127.0.0.1',
    database: 'test',
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
};