import {UserInputError} from 'apollo-server';
import {TUserCredential} from '../../../../types';
import signInUser from './signInUser';

export default function signInMutation({email, password, name}: TUserCredential) {
  const validateEmailBool = /\S+@\S+\.\S+/.test(email);
  if (validateEmailBool) {
    return signInUser({email, password, name});
  } else {
    throw new UserInputError('Email is invalid', {invalidArgs: email});
  }
}
