import { isPrismaError } from './../utils/is-prisma-error.util';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class DataBaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrismaError(error)) {
        }
        throw error;
      }),
    );
  }
}
