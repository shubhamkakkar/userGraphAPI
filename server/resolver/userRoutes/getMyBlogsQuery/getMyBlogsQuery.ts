import {UserInputError} from 'apollo-server';
import BlogsSchema from '../../../models/blogModel';
import UserSchema from '../../../models/userModel';
import {TGetMyBlogsQueryParameter} from '../../../types';
import emailFromToken from '../../util/emailFromToken';
import filterConfigGenerator from '../../util/filterConfigGenerator';
export default function getMyBlogsQuery({token, ...filterOptions}: TGetMyBlogsQueryParameter) {
  const email = emailFromToken({token});
  return UserSchema.findOne({email})
    .then(user => {
      if (user) {
        // @ts-ignore
        const {_id} = user._doc;
        const [filterSearchConfig, error] = filterConfigGenerator(filterOptions);
        if (error.invalidArgs) {
          throw new UserInputError(error.message || 'Error', {invalidArgs: error.invalidArgs});
        } else {
          return BlogsSchema.find({userId: _id, ...filterSearchConfig})
            .then(userSpecificBlogs => userSpecificBlogs)
            .catch(erUserSpecificBlogs => erUserSpecificBlogs);
        }
      } else {
        throw new UserInputError('User not found', {invalidArgs: email});
      }
    })
    .catch(erGetMyBlog => {
      console.log({erGetMyBlog});
      return erGetMyBlog;
    });
}
