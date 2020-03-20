import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken"
import {TUserCredential} from "../../types";
import UserModal from "../../models/userModel";
import {UserInputError} from "apollo-server";
const saltRounds = 10;
export default function signInUser({ email,password }:TUserCredential ) {
    return UserModal.findOne({ email })
        .then( (user) => {
            if(user){
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
            }else{
                // create new user
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
