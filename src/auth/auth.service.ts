import { Injectable } from "@nestjs/common";
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(5);

//Auto generate id:
const uuidv1 = require("uuid/v1");
const jwt = require("jsonwebtoken");
const secret = "acexis";

@Injectable()
export class AuthService {
	private userList = [];
    
    handleRegister(body) {
		const { name, username, password } = body;
		const userExist =
			this.userList.findIndex(user => user.username === username) >= 0;

		if (userExist) {
			return false;
        }
        
		const hashPwd = bcrypt.hashSync(password, salt);
		const id = uuidv1();
        
        this.userList.push({ name, username, password: hashPwd, userID: id });
        
        return true;
    }
    
    getUserInfo(username){
        const user = this.userList.find(usr=>usr.username === username);
        return user;
    }

    handleLogin(body){
        const {username,password} = body;

        const user = this.userList.find(usr=>usr.username === username);

        if (!user) {
			return false;
        }

        else if (!bcrypt.compareSync(password, user.password)){
            return false;
        }

        else {
            const {userID,...rest} = user;
            const token = jwt.sign({userID},secret);
            return {token};
        }
    }

    handleProtected(header){
        const token = header.authorization.replace("Bearer ","");
        const verify = jwt.verify(token, secret);
        if (!verify) return false;
        else {
            const decode = jwt.decode(token);
            const user = this.userList.find(usr=>usr.userID ===decode.userID)
            if (!user){
                return false;
            }
            else return user;
        }

    }
}