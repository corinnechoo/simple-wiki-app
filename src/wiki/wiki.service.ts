import { Repository , Connection} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection} from '@nestjs/typeorm';

import { ENDPOINTS_DATA } from './data/endpoints';
import { CategoryOutdatedness } from './entities/category-outdatedness.entity';

@Injectable()
export class WikiService {
    constructor(
        @InjectRepository(CategoryOutdatedness)
        private CategoryOutdatednessRepository: Repository<CategoryOutdatedness>,

        @InjectConnection()
         private connection: Connection

    ) { }

    endpointsData = ENDPOINTS_DATA;

    getEndpoints(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.endpointsData);
        });
    };
    getCustomQuery(sql): Promise<any> {
        let response = this.connection.query(sql)
        return response
    }


    // TODO: format response (do we want page title to be space separated? )
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
        let response = this.CategoryOutdatednessRepository.query(sql)
        return response
    }
}
