import { Controller, Get, Param,Response } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private readonly authService:AuthService){}

    @Get(':username')
    getUserInfo(@Param('username') userName,@Response() res){
        const user = this.authService.getUserInfo(userName); 
        if (!user){
            res.status(404).end();
        }
        else res.json(user);
    }

}
