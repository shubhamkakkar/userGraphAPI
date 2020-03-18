import { gql } from 'apollo-server'

import userSchema from './users/user';

const linkSchema = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
    type Subscription {
        _: Boolean
    }
`;

export default [linkSchema, userSchema];
