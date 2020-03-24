import {TGetMyBlogsQueryParameter} from '../../../types';
import emailFromToken from '../../util/emailFromToken';
import UserSchema from '../../../models/userModel';
import BlogsSchema from '../../../models/blogModel';
import {UserInputError} from 'apollo-server';
export default function getMyBlogsQuery({token}: TGetMyBlogsQueryParameter) {
  const email = emailFromToken({token});
  return UserSchema.findOne({email})
    .then(user => {
      if (user) {
        // @ts-ignore
        const {_id} = user._doc;
        return BlogsSchema.find({userId:_id}).then(userSpecificBlogs => userSpecificBlogs);
      } else {
        throw new UserInputError('User not found', {invalidArgs: email});
      }
    })
    .catch(erGetMyBlog => {
      console.log({erGetMyBlog});
      return erGetMyBlog;
    });
}
