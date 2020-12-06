
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ParamDto } from '../../utils/dto/param.dto';

@Injectable()
export class ValidationGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {//boolean| Promise<boolean> {//| Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const paramsTemp = plainToClass(ParamDto, req.query, { excludeExtraneousValues: true });//

        try {
            // Validate 
            await validateOrReject(paramsTemp);
            return true;
        }
        catch (err) {
            throw new BadRequestException({status: 400, message: err[0].constraints, error: "Bad Request"})
        }
    }
}