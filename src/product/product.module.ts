import { Module } from '@nestjs/common'
import { ProductController } from './product.controller'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [ProductController],
  imports: [AuthModule],
})
export class ProductModule {}
