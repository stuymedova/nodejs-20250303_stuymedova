import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { appendFileSync } from "fs";

@Injectable()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException | Error, host: ArgumentsHost) {
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const response = exception instanceof HttpException
      ? exception.getResponse()
      : exception.message;
    appendFileSync(
      'errors.log',
      `[${(new Date()).toISOString()}] ${status} - ${response}\n`,
    );
    host.switchToHttp().getResponse().status(status).json({
      statusCode: status,
      message: response,
      timestamp: new Date().toISOString(),
    });
  }
}
