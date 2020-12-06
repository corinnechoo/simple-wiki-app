import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength , ValidateNested} from 'class-validator';

/**
 * Defines the schema of the request body. An assumption made is that users should not be allowed to 
 * alter the database, so this checks that the sql statement should always contain a case
 * insensitve select clause. It also checks that the statement contains a valid table name, 
 * by looking for eg. 'category '. this assumes that there is a space after the table name, which 
 * should hold true since users should provide a limit clause.
 */
export class BodyDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(14) // 'select * from '
    @Matches(/(select)+/i, {
        message: 'SQL must be a SELECT statement'
    })
    @Matches(/((category|categorylinks|categoryoutdatedness|page|pagelinksorder)\s)+/, {
        message: 'Available tables for query: category, categorylinks, categoryoutdatedness, page, pagelinksorder'
    })
    @Matches(/(limit)+/i, {
        message: 'SQL must be a containt a LIMIT value up to 100'
    })
    @Expose({ name: 'sql' })
    "sql": string;
}
