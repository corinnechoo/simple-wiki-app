import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ParamDto } from './../../utils/dto/param.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export class ParseSqlPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    // if (value.toLowerCase().indexOf("limit") === -1) {
    //   value += " LIMIT 100"
    // }

    // console.log(value)
    return value
    // const val = parseInt(value, 10);
    // if (isNaN(val)) {
    //   
    // }
    // return val;
  }
}