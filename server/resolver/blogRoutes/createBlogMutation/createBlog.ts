import {TCreateBlogFn} from '../../../types';
import BlogSchema from '../../../models/blogModel';

export default function createBlog(createBlogParams: TCreateBlogFn) {
  const newBlog = new BlogSchema(createBlogParams);
  newBlog
    .save()
    .then(createdBlog => {
      console.log({createdBlog});
    })
    .catch(createBlogEr => {
      console.log({createBlogEr});
    });
}
