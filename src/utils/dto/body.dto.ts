import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength , ValidateNested} from 'class-validator';

export class BodyDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(14) // 'select * from '
    @Matches(/(select)+/i, {
        message: 'SQL must be a SELECT statement'
    })
    @Matches(/(category|categorylinks|categoryoutdatedness|page|pagelinksorder)+/, {
        message: 'Available tables for query: category, categorylinks, categoryoutdatedness, page, pagelinksorder'
    })
    @Expose({ name: 'sql' })
    "sql": string;
}
