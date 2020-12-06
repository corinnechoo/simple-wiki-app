import {
    Controller, Get, Headers, Param, Query, Req, UseGuards, UseInterceptors
} from '@nestjs/common';

import { WikiService } from './wiki.service';
import {ParseSqlPipe} from './pipes/custom-query.pipe'
// var parseUrl = require('parseurl');
import { ValidationGuard } from './guards/validator.guard';

@Controller('wiki-query')
export class WikiController {
    constructor(private wikiService: WikiService) { }

    @Get()
    async getEndpoints() {
        const report = await this.wikiService.getEndpoints();
        return report;
    }
    //so that users will know how to query categories (assuming they don't)
    // @Get('categories')
    // async getCategories() {
    //     return 'placeholder';
    // }
    @UseGuards(ValidationGuard)
    @Get('custom-query') // todo: rename endpoint
    async getCustomQuery(@Query('sql',ParseSqlPipe) sql: string) {//@Query('sql', ParseSqlPipe) sql: string
        return
        const mostOutdatedPage = await this.wikiService.getCustomQuery(sql);
        return mostOutdatedPage;
    }

    // Assumption: users will give correct input? because case sensitivity matters? or should we store the categories as case insensitive?
    @Get('most-outdated-page') // todo: rename endpoint
    async getOutdatedPages(@Query('category') category: string) {
        const mostOutdatedPage = await this.wikiService.getOutdatedPages(category);
        return mostOutdatedPage;
    }

}


