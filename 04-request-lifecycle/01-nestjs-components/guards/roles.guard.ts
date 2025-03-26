import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const role = req.headers['x-role'];
    if (role !== 'admin') {
      throw new ForbiddenException('Доступ запрещён: требуется роль admin');
    }
    return true;
  }
}
