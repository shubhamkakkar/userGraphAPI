import {TCreateBlogFn} from '../../../types';
import BlogSchema from '../../../models/blogModel';
import {UserInputError} from 'apollo-server';

export default function createBlog({user, ...createBlogParams}: TCreateBlogFn) {
  const {email, _id, name} = user;
  const schemaPayload = {
    userId: _id,
    ...createBlogParams,
  };
  const newBlog = new BlogSchema(schemaPayload);
  return newBlog
    .save()
    .then(createdBlog => {
      return {
        user: {
          name,
          email,
        },
        // @ts-ignore
        ...createdBlog._doc,
      };
    })
    .catch(createBlogEr => {
      console.log({createBlogEr});
      throw new UserInputError('createBlogEr');
    });
}
