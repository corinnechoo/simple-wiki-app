import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseSqlPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    const limit = "limit "
    try {
      var limitValue = value.toLowerCase().split(limit)[1].split(" ")[0]
      var limitNum = parseInt(limitValue)
      if (isNaN(limitNum)) {
        throw new BadRequestException('limit should is not a number');
      }
      else if (limitNum > 100) {
        throw new BadRequestException('limit should be < 100')
      }
      return value
    }
    catch (err) {
      throw err
    }
  }
}
