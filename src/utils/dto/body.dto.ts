import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength , ValidateNested} from 'class-validator';

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
