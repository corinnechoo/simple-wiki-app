import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

/**
 * Defines the schema of the request header.
 */
export class HeaderDto {
    @Matches(/application\/json$/, {
        message: 'content-type should be application/json'
    })
    @IsNotEmpty()
    @IsString()
    @Expose({ name: 'content-type' })
    'content-type': string;

}