import {TUserCredential} from "../../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserInputError} from "apollo-server";

interface IReturnPrevUser extends TUserCredential{
    user: any;
}

export default function returnPrevUser({email, password, user}:IReturnPrevUser) {
    // @ts-ignore
    const {password: hashedPassword} = user._doc;
    return bcrypt.compare(password, hashedPassword)
        .then(passwordCheckBool =>{
            if(passwordCheckBool){
                const token =  jwt.sign({email}, "string");
                return {
                    token,
                    // @ts-ignore
                    ...user._doc,
                }
            }else{
                throw new UserInputError('Passwords Dont Match', {invalidArgs: password});
            }
        })
        .catch(er => er);
}
