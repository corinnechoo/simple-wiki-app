import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Defines the schema of the request header.
 */
export class QueryDto {
    @IsNotEmpty()
    // @IsString()
    @Expose({ name: 'category' })
    'category': string;
}