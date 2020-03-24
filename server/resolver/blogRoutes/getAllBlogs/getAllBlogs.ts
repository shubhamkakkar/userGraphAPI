import {TBlog} from './../../../types';
import BlogSchema from '../../../models/blogModel';
import UserSchema from '../../../models/userModel';
export default function getAllBlogs() {
  return BlogSchema.find()
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
