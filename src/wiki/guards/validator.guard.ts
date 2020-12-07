
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { HeaderDto } from '../../utils/dto/header.dto';
import { BodyDto } from '../../utils/dto/body.dto';
import { QueryDto } from '../../utils/dto/query.dto';

/**
 * As Headers cannot be validated in a pipe in nestjs, a guard is used for validating input data.
 * ValidationGuard will validate the request body, ensuring that it is an object with key 'sql' required
 * for the endpoint and the header contains the correct content-type. 
 * @return {Boolean}      Whether the request body and header meets the validation requirements or not
 */
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


/**
 * ValidationGuard will validate the request query params, ensuring that the category given is not null
 * @return {Boolean}      Whether the request query params meets the validation requirements or not
 */
@Injectable()
export class ValidationGuardMostOutdatedPage implements CanActivate {
    constructor(private reflector: Reflector) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {//boolean| Promise<boolean> {//| Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const queryTemp = plainToClass(QueryDto, req.query, { excludeExtraneousValues: true });

        try {
            // Validate             
            await validateOrReject(queryTemp);
            return true;
        }
        catch (err) {
            throw new BadRequestException({status: 400, message: err[0].constraints, error: "Bad Request"})
        }
    }
}