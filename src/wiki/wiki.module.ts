import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WikiController } from './wiki.controller';
import { WikiService } from './wiki.service';
import { CategoryOutdatedness } from './entities/category-outdatedness.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryOutdatedness])],
    controllers: [WikiController],
    providers: [WikiService]
})
export class WikiModule { }
