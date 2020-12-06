import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WikiController } from './wiki.controller';
import { WikiService } from './wiki.service';

@Module({
    imports: [],
    controllers: [WikiController],
    providers: [WikiService]
})
export class WikiModule { }
