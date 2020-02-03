import { Controller, Post, Body, Response} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}
    
    @Post('register')
    handleRegister(@Body() body,@Response() res){
        if (!this.authService.handleRegister(body)){
            res.status(409).send("Username exist");
            res.end();
        }
        else {
            res.status(204).end();
        }
    }

    @Post('login')
    handleLogin(@Body() body,@Response() res){
        const token = this.authService.handleLogin(body);
        if (!token){
            res.status(404).end();
        }
        else res.json(token);
    }
}
