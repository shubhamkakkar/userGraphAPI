import {TUserCredential} from "../types";
import signInMutation from "./signInMutation/signInMutation";

export default {
    Query: {
        // users: () => usersQuery(),
    },
    Mutation: {
        signIn: (_: any, args: TUserCredential) => signInMutation(args),
        // login: (parent: any, args: User) => loginMutation(args)
    },
};
