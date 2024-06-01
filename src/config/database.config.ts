import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    url: 'postgresql://beijedb_owner:wZB16eVFNQXJ@ep-wandering-pine-a257x32g.eu-central-1.aws.neon.tech/beijedb?sslmode=require',
    autoLoadEntities: true,
    synchronize: false,
  }),
);