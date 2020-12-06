import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Intercepts the response object and formats it
 * @return {Object}      returns the status code, value and message  
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(map(value => {
                return {
                    status: context.switchToHttp().getResponse().statusCode,
                    data: value
                }
            }),
                catchError(err => {
                    return throwError(err);
                }),
            );
    }
}
