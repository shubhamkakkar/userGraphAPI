import {UserInputError} from 'apollo-server';
import BlogSchema from '../../../models/blogModel';
import UserSchema from '../../../models/userModel';
import {TBlog, TFilterDBSearch} from '../../../types';
import filterConfigGenerator from '../../util/filterConfigGenerator';

export default function getAllBlogs({...filterOptions}: TFilterDBSearch) {
  const [filterSearchConfig, error] = filterConfigGenerator(filterOptions);
  if (error.invalidArgs) {
    throw new UserInputError(error.message || 'Error', {invalidArgs: error.invalidArgs});
  } else {
    return BlogSchema.find({...filterSearchConfig})
      .then(blogs => {
        // @ts-ignore
        return blogs.map((blog: TBlog) => {
          const {userId, ...restBlogInfo} = blog;
          return UserSchema.findById(userId)
            .then(user => {
              // @ts-ignore
              const {name, email} = user._doc;
              return {
                user: {name, email},
                // @ts-ignore
                ...restBlogInfo._doc,
              };
            })
            .catch(erFindingUserInsideGetAllBlogs => erFindingUserInsideGetAllBlogs);
        });
      })
      .catch(getAllBlogsEr => {
        console.log({getAllBlogsEr});
        return getAllBlogsEr;
      });
  }
}
