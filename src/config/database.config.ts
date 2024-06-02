import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: 'postgresql://emailverificationdb_owner:Yiyp3EtrR2Wh@ep-flat-smoke-a2iorx0y.eu-central-1.aws.neon.tech/emailverificationdb?sslmode=require',
    // url: process.env.PGURL,
    autoLoadEntities: true,
    synchronize: false,
  }),
);
