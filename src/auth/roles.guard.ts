/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./role.enum";
import { Roles_Key } from "./roles.decorator";
import { UsersService } from "src/users/users.service";
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private userService: UsersService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(Roles_Key, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        // Ensure the user object exists and has a roles property
        const { user } = context.switchToHttp().getRequest();
        const dbUser = await this.userService.findOne(user.username);
        // const user = request.user;
        //console.log(user)
        //console.log(dbUser)
        // Check if user and user.roles exist before proceeding
        if (!user) {
            // Handle the case where user or user.roles is undefined
            // This could involve returning false, throwing an exception, or logging an error
            console.error('User  is undefined');
            return false; // Or handle as appropriate for your application
        }
        if (!dbUser.roles) {
            // Handle the case where user or user.roles is undefined
            // This could involve returning false, throwing an exception, or logging an error
            console.error('User Roles  is undefined');
            return false; // Or handle as appropriate for your application
        }
        return requiredRoles.some((role) => dbUser.roles.includes(role));
    }
}