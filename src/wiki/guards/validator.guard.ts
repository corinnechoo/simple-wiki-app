
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { HeaderDto } from '../../utils/dto/header.dto';
import { BodyDto } from '../../utils/dto/body.dto';

@Injectable()
export class ValidationGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {//boolean| Promise<boolean> {//| Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const headersTemp = plainToClass(HeaderDto, req.headers, { excludeExtraneousValues: true });

        try {
            // Validate             
            await validateOrReject(headersTemp);
            const bodyTemp = plainToClass(BodyDto, req.body, { excludeExtraneousValues: true });
            await validateOrReject(bodyTemp);

            return true;
        }
        catch (err) {
            throw new BadRequestException({status: 400, message: err[0].constraints, error: "Bad Request"})
        }
    }
}