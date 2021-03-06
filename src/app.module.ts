import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WikiModule } from './wiki/wiki.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			dateStrings: true,
			autoLoadEntities: true,
			entities: [],
		}),
		WikiModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
