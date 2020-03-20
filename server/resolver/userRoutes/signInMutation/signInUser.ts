import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken"
import {TUserCredential} from "../../../types";
import UserModal from "../../../models/userModel";
import returnPrevUser from "../../util/returnPrevUser";
const saltRounds = 10;
export default function signInUser({ email,password }:TUserCredential ) {
    return UserModal.findOne({ email })
        .then( (user) => {
            if(user){
              return returnPrevUser({ email, password, user })
            }else{
                return bcrypt.hash(password, saltRounds)
                    .then(passwordBcrypt => {
                        const newUser = new UserModal({
                            email,
                            password: passwordBcrypt
                        });
                        const token =  jwt.sign({email}, "string");
                        return newUser.save()
                            .then( (savedUser: any) => {
                                return {
                                    token,
                                    ...savedUser._doc,
                                }
                            })
                            .catch((er: any) => er)
                    });

            }
        } )
}
