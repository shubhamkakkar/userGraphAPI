import {TGetMyBlogsQueryParameter} from '../../../types';
import emailFromToken from '../../util/emailFromToken';
import UserSchema from '../../../models/userModel';
import BlogsSchema from '../../../models/blogModel';
import {UserInputError} from 'apollo-server';
import regexYYYYMMDDFormatCheck from '../../util/regexYYYYMMDDFormatCheck';
export default function getMyBlogsQuery({token, createdAt, beforeCurrentData}: TGetMyBlogsQueryParameter) {
  const email = emailFromToken({token});
  return UserSchema.findOne({email})
    .then(user => {
      if (user) {
        // @ts-ignore
        const {_id} = user._doc;
        let filterSearchConfig = {};
        if (createdAt) {
          const correctDateFormatCheckBool = regexYYYYMMDDFormatCheck(createdAt);
          if (correctDateFormatCheckBool) {
            const gtOrle = `$${beforeCurrentData ? 'l' : 'g'}te`;
            filterSearchConfig = {
              ...filterSearchConfig,
              createdAt: {
                [gtOrle]: createdAt,
              },
            };
          } else {
            throw new UserInputError('Date is invalid, the format should be YYYY-MM-DD and must also be valid', {
              invalidArgs: createdAt,
            });
          }
        }
        console.log({filterSearchConfig});
        return BlogsSchema.find({userId: _id, ...filterSearchConfig})
          .then(userSpecificBlogs => userSpecificBlogs)
          .catch(erUserSpecificBlogs => erUserSpecificBlogs);
      } else {
        throw new UserInputError('User not found', {invalidArgs: email});
      }
    })
    .catch(erGetMyBlog => {
      console.log({erGetMyBlog});
      return erGetMyBlog;
    });
}
