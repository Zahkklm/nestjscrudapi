import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../config/database.config';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync(
            {
                inject: [ConfigService],
                useFactory: async (configService: ConfigService) => ({
                    type: configService.get('DB_TYPE'), // postgres
                    url: configService.get('DB_URL'), // connection string
                    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    synchronize: true, 
                }),
                
            }
        ),
    ],
})
export class DatabaseModule { }