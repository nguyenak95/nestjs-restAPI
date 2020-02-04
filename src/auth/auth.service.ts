import { Injectable } from '@nestjs/common'

import bcrypt = require('bcrypt')

const uuidv1 = require('uuid/v1')

const jwt = require('jsonwebtoken')

const salt = bcrypt.genSaltSync(5)

// Auto generate id:
const secret = 'acexis'

@Injectable()
export class AuthService {
private userList = [];

handleRegister(body) {
  const { name, username, password } = body
  const userExist = this.userList.findIndex((user) => user.username === username) >= 0

  if (userExist) {
    return false
  }

  const hashPwd = bcrypt.hashSync(password, salt)
  const id = uuidv1()

  this.userList.push({
    name, username, password: hashPwd, _id: id
  })

  return true
}

getUserInfo(username) {
  const user = this.userList.find((usr) => usr.username === username)
  return user
}

handleLogin(body) {
  const { username, password } = body

  const user = this.userList.find((usr) => usr.username === username)

  if (!user) {
    return false
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return false
  }
  const { _id, ...rest } = user
  const token = jwt.sign({ userID: _id }, secret)
  return { token }
}

checkValidToken(userID) {
  // eslint-disable-next-line no-underscore-dangle
  return this.userList.findIndex((usr) => usr._id === userID) !== -1
}
}
