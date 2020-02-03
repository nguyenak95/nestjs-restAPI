import { Controller, Get, UseGuards, Request } from '@nestjs/common';
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
    handleProtected(@Request() req){
        return `private content of ${req.userID}`;
    }
}
