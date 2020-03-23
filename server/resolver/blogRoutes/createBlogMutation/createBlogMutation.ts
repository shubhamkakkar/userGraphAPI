import {TCreateBlog} from '../../../types';
import UserSchema from '../../../models/userModel';
import jwt from 'jsonwebtoken';
import createBlog from './createBlog';

type TDecodeJWT = {
  email: string;
};

export default function createBlogMutation({token, ...rest}: TCreateBlog) {
  // @ts-ignore
  const {email}: TDecodeJWT = jwt.verify(token, 'string');
  return UserSchema.findOne({email})
    .then(user => {
      if (user) {
        //@ts-ignore
        return createBlog({userId: user._doc._id, ...rest});
      } else {
        console.log('no user found');
      }
    })
    .catch(er => {
      console.log('er getting users in createBlogUserFind', er);
    });
}
