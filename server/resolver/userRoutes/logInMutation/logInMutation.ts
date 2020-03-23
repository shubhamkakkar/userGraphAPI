import {UserInputError} from 'apollo-server';
import {TUserCredential} from '../../../types';
import logInUser from "./logInUser";

export default function logInMutation({email, password,name}: TUserCredential) {
    const validateEmailBool = /\S+@\S+\.\S+/.test(email);
    if (validateEmailBool) {
        return logInUser({email, password,name})
    } else {
        throw new UserInputError('Email is invalid', {invalidArgs: email});
    }
}
