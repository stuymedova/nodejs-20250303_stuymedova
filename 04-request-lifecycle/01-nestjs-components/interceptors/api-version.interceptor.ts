import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    const start = Date.now();
    return next.handle().pipe(map((data) => ({
      ...data,
      apiVersion: '1.0',
      executionTime: `${Date.now() - start}ms`,
    })));
  }
}
