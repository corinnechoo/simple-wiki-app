import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class HeaderDto {
    @Matches(/application\/json$/, {
        message: 'content-type should be application/json'
    })
    @IsNotEmpty()
    @IsString()
    @Expose({ name: 'content-type' })
    'content-type': string;

}