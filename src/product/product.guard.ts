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
            const validHeader = authorize.search("Bearer ") !== -1;
            const token = authorize.replace("Bearer ","");

            if (validHeader){
                try {
                    const userID = jwt.verify(token, "acexis").userID;

                    // If userID exist in database, then assign userID to Request Object, if token valid but not exist req.userID will null
                    if (this.authService.checkUser(userID)){
                        request.userID = userID;
                    }
                    return true; 
                }
                catch{
                    return true;
                }
            }
            else return false;
        }
    }
}
