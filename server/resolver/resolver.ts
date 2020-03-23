import {TCreateBlog, TUserCredential} from "../types";
import {signInMutation,logInMutation} from "./userRoutes";
import {createBlogMutation} from "./blogRoutes";

export default {
    Query: {
    },
    Mutation: {
        signIn: (_: any, args: TUserCredential) => signInMutation(args),
        logIn: (_: any, args: TUserCredential) => logInMutation(args),
        createBlog: (_:any, args:TCreateBlog) => createBlogMutation(args),
    },
};
