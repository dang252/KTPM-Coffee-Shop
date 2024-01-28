// import { DataSource, DataSourceOptions } from "typeorm";
// import { ConfigModule, ConfigService } from '@nestjs/config';

// export const dataSourceOptions: DataSourceOptions = {
//     type: 'postgres',
//     host: configService.get('DB_HOST'),
//     port: +configService.get<number>('DB_PORT'),
//     username: configService.get('DB_USERNAME'),
//     password: configService.get('DB_PASSWORD'),
//     database: configService.get('DB_NAME'),
//     entities: [__dirname + '/**/*.entity{.ts,.js}'],
//     // migrations: [__dirname + '/dist/db/migration/*{.ts,.js}'],
//     synchronize: true,
// };

// const dataSource = new DataSource(dataSourceOptions);
// export default dataSource;