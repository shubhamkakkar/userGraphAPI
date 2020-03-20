import {UserInputError} from 'apollo-server';
import {TUserCredential} from '../../types';
import signInUser from "./signInUser";

export default function signInMutation({email, password}: TUserCredential) {
  console.log({email, password});
  const validateEmailBool = /\S+@\S+\.\S+/.test(email);
  if (validateEmailBool) {
    return signInUser({email, password})
  } else {
    throw new UserInputError('Email is invalid', {invalidArgs: email});
  }
}
