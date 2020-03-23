import {TUserCredential} from '../../../types';
import UserModal from '../../../models/userModel';
import returnPrevUser from '../../util/returnPrevUser';
import {UserInputError} from "apollo-server";

export default function logInUser({email, password,name}: TUserCredential) {
  return UserModal.findOne({email})
    .then(user => {
      if (user) {
        return returnPrevUser({email, password,name, user});
      } else {
          throw new UserInputError('User does not exists', {invalidArgs: email});
      }
    })
    .catch(er => er);
}
