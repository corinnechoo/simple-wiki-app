import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

/**
 * Pipes are used for transformating / validating input data. ParseSqlPipe enforces the sql 
 * given by the user to contain the LIMIT clause and ensures that the value is < 100, since 
 * allowing the user to input any raw query could return quite a large amount of data. In the future,
 * proper pagination can be added
 * @return {String}      the transformed value of the input
 */
@Injectable()
export class ParseSqlPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    const cleanSql = value.trim();

    if (cleanSql.match(/^(insert|update|delete|truncate)/i)) {
      throw new BadRequestException('Statement should not insert|update|delete|truncate');
    } 

    const limit = "limit "
    try {
      var limitValue = value.toLowerCase().split(limit)[1].split(" ")[0]
      var limitNum = parseInt(limitValue)
      if (isNaN(limitNum)) {
        throw new BadRequestException('Limit is not a number');
      }
      else if (limitNum > 100) {
        throw new BadRequestException('Limit should be < 100. To query more data, use offset in the statement as well')
      }
      return value
    }
    catch (err) {
      throw err
    }
  }
}

