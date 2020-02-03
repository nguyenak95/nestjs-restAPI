import { Controller, Get, UseGuards, Headers,Response } from '@nestjs/common';
import { ProductGuard } from './product.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('product')
export class ProductController {
    constructor(private readonly authService:AuthService){}
    @Get('public')
    handlePublic(){
        return "public content"
    }

    @Get('protected')
    @UseGuards(ProductGuard)
    handleProtected(@Headers() header,@Response() res){
        const user = this.authService.handleProtected(header);
        if (!user) {
            res.status(401).end();
        }
        else {
            res.send(`private content of ${user.userID}`);
        }
    }
}
