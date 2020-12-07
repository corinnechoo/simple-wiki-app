import {
    Controller, Get, Post, Headers, Body, Query, UseGuards, UseInterceptors, HttpCode
} from '@nestjs/common';

import { WikiService } from './wiki.service';
import {ParseSqlPipe} from './pipes/custom-query.pipe'
import { ValidationGuard } from './guards/validator.guard';
import { ResponseInterceptor } from './interceptors/transform.interceptor';
import { QueryDto } from './../utils/dto/query.dto';

/**
 * Handles incoming requests and returns responses to the client with route path prefix 'wiki-query'
 */
@UseInterceptors(ResponseInterceptor)
@Controller('wiki-query')
export class WikiController {
    constructor(private wikiService: WikiService) { }

    /**
     * Route maps to GET /wiki-query
     * @return {Object}      The list of available endpoints
     */
    @Get()
    async getEndpoints() {
        const report = await this.wikiService.getEndpoints();
        return report;
    }
    /**
     * Route maps to GET /wiki-query/custom-query
     * @return {Object}      The result of the query executed
     */
    @UseGuards(ValidationGuard)
    @HttpCode(200) 
    @Post('custom-query') // todo: rename endpoint
    async getCustomQuery(
        @Headers('Content-Type') contentType: string,
        @Body('sql', ParseSqlPipe) sql: string
    ) {
        const customData = await this.wikiService.getCustomQuery(sql);
        return customData;
    }

    /**
     * Route maps to GET /wiki-query/most-outdated-page
     * @return {Object}      The most outdated page in the category given
     */
    // Assumption: users will give correct input? because case sensitivity matters? or should we store the categories as case insensitive?
    @Get('most-outdated-page')
    async getOutdatedPages(@Query('category') category: QueryDto) {
        const mostOutdatedPage = await this.wikiService.getOutdatedPages(category);
        return mostOutdatedPage;
    }

}


