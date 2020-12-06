import {
    Controller, Get, Post, Headers, Body, Query, UseGuards
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
    @Post('custom-query') // todo: rename endpoint
    async getCustomQuery(
        @Headers('Content-Type') contentType: string,
        @Body('sql') sql: string
    ) {
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


