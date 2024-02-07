import { TypeOrmModuleOptions } from '@nestjs/typeorm';


// export const typeOrmConfig: TypeOrmModuleOptions = {
//     type: 'postgres',
//       host: 'db',
//       port: 5432,
//       username: 'postgres',
//       password: 'postgres',
//       database: 'postgres',
//       entities: [__dirname + '/../**/*.entity.{js,ts}'],
//       synchronize: true,
//       autoLoadEntities: true,
//   };

  export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '654321',
      database: 'work_db',
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
      autoLoadEntities: true,
  };