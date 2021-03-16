import { TypeOrmModuleOptions } from "@nestjs/typeorm";

//export const config: TypeOrmModuleOptions = {
//    type: 'mariadb',
//    username: 'root',
//    password: 'interviewquestion123!',
//    port: 3306,
//    host: '127.0.0.1',
//    database: 'test',
//    synchronize: false,
//    entities: ['dist/**/*.entity{.ts,.js}'],
//};

export const config: TypeOrmModuleOptions = {
    type: 'mariadb',
    username: 'admin',
    password: 'AWSqawerds2357!',
    port: 3306,
    host: 'sogangtree-dev.cirpywmbmjsg.ap-northeast-2.rds.amazonaws.com',
    database: 'innodb',
    synchronize: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
};
