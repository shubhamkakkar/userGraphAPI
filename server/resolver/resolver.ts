import {TCreateBlog, TGetMyBlogsQueryParameter, TUserCredential} from '../types';
import {signInMutation, logInMutation, getMyBlogsQuery} from './userRoutes';
import {createBlogMutation, getAllBlogs} from './blogRoutes';

export default {
  Query: {
    getAllBlogs: (_: any, params: TGetMyBlogsQueryParameter) => getAllBlogs(params),
    getMyBlogs: (_: any, params: TGetMyBlogsQueryParameter) => getMyBlogsQuery(params),
  },
  Mutation: {
    signIn: (_: any, args: TUserCredential) => signInMutation(args),
    logIn: (_: any, args: TUserCredential) => logInMutation(args),
    createBlog: (_: any, args: TCreateBlog) => createBlogMutation(args),
  },
};
