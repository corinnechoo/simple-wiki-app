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
        const sql = `
        SELECT CAST(c1.category AS CHAR(100)) AS category, c1.page_id, c1.time_stamp_diff, CAST(p.page_title AS CHAR(100)) page_title
        FROM page p,
        (
           SELECT c2.page_id , MAX(c2.time_stamp_diff) maxdiff
           FROM categoryoutdatedness c2 
           WHERE c2.category = '${category}'
           GROUP BY c2.category 
        ) c2 
        INNER JOIN  categoryoutdatedness c1
            ON c1.category = '${category}' AND c1.time_stamp_diff = c2.maxdiff
        WHERE p.page_id = c1.page_id;
        `
        let response = this.connection.query(sql)
        return response
    }
}
