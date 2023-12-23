import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: "localhost",
    port: +5432,
    username: "postgres",
    password: "123456",
    database: "KTPM-coffee-shop",
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // migrations: [__dirname + '/dist/db/migration/*{.ts,.js}'],
    synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;