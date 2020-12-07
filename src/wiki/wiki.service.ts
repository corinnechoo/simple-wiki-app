import { Connection } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';

import { ENDPOINTS_DATA } from './data/endpoints';


/**
 * Responsible for retrieving data and returning it to the controller
 */
@Injectable()
export class WikiService {
    constructor(
        @InjectConnection()
        private connection: Connection

    ) { }

    endpointsData = ENDPOINTS_DATA;

    /**
     * Returns the list of endpoints available imported from the static file endpoints.ts
     * @return {Object}      The list of endpoints 
     */
    getEndpoints(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.endpointsData);
        });
    };

    /**
     * Add two numbers together
     * @param  {String} sql Raw SQL statement
     * @return {Promise}    If the promise is resolved, returns data retrieved from the db else throws error
     */
    getCustomQuery(sql): Promise<any> {
        let response = this.connection.query(sql).catch((error) => {
            throw new BadRequestException(error.message);
        });
        return response
    }

    /**
     * Gets the most outdated page in a category
     * @param  {String} category category user gives
     * @return {Promise}    If the promise is resolved, returns an object containing the category, 
     *                      page_id, timestamp (in seconds) difference and page title retrieved from 
     *                      the db else throws error
     */
    // TODO: format response (do we want page title to be space separated? convert seconds to days?)
    getOutdatedPages(category): Promise<any> {
        const cleanCategory = category.replace("'", "\'")
        const sql = `
        SELECT
            co.page_id, co.time_stamp_diff, CAST(p.page_title AS CHAR(100)) page_title, p.page_last_modified 
        FROM
            categoryoutdatedness co,
            page p
        WHERE co.time_stamp_diff in 
        (
            SELECT MAX(c.time_stamp_diff) maxdiff
            FROM categoryoutdatedness c 
            WHERE c.category = '${cleanCategory}'
            GROUP BY c.category)
            AND p.page_id = co.page_id
        `
        let response = this.connection.query(sql)
        return response
    }
}

