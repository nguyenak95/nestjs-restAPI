import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
const jwt = require("jsonwebtoken");

@Injectable()
export class ProductGuard implements CanActivate {
    constructor(private readonly authService:AuthService){}

	canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authorize = request && request.headers.authorization;

        if (!authorize){
            return false
        }
        else {
            const validToken = authorize.search("Bearer ") !== -1;
            const token = authorize.replace("Bearer ","");

            if (validToken){
                try {
                    const userID = jwt.verify(token, "acexis").userID;
                    if (this.authService.checkUser(userID)){
                        request.userID = userID;
                        return true; 
                    }
                    else return false;
                }
                catch{
                    return false;
                }
            }
            else return false;
        }
    }
}
