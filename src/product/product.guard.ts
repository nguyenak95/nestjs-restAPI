import {
  CanActivate, ExecutionContext, Injectable, HttpException
} from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'

const jwt = require('jsonwebtoken')

@Injectable()
export class ProductGuard implements CanActivate {
  constructor(private readonly authService:AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const authorize = request && request.headers.authorization
    if (!authorize) {
      return false
    }

    const validHeader = authorize.search('Bearer ') !== -1
    if (!validHeader) {
      return false
    }

    const token = authorize.replace('Bearer ', '')
    jwt.verify(token, 'acexis', (err, decode) => {
      if (err || !this.authService.checkValidToken(decode.userID)) {
        throw new HttpException('Wrong token', 403)
      }
      request.userID = decode.userID
    })
    return true
  }
}
