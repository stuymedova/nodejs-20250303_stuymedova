import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { appendFileSync } from "fs";

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
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
