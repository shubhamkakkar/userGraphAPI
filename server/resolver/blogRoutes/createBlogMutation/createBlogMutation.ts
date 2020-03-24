import {TCreateBlog} from '../../../types';
import UserSchema from '../../../models/userModel';
import createBlog from './createBlog';
import emailFromToken from "../../util/emailFromToken";


export default function createBlogMutation({token, ...rest}: TCreateBlog) {
  const email = emailFromToken({token});
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
      return er;
    });
}
