import {TUserCredential} from "../types";
import {signInMutation,logInMutation} from "./userRoutes";

export default {
    Query: {
    },
    Mutation: {
        signIn: (_: any, args: TUserCredential) => signInMutation(args),
        logIn: (_: any, args: TUserCredential) => logInMutation(args)
    },
};
