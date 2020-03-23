import {TCreateBlogFn} from '../../../types';
import BlogSchema from '../../../models/blogModel';
import {UserInputError} from "apollo-server";

export default function createBlog(createBlogParams: TCreateBlogFn) {
  const newBlog = new BlogSchema(createBlogParams);
  return newBlog
    .save()
    .then(createdBlog => createdBlog)
    .catch(createBlogEr => {
      console.log({createBlogEr});
      throw new UserInputError('createBlogEr', );
    });
}
