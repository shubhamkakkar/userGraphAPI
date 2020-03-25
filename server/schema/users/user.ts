import {gql} from 'apollo-server';

export default gql`
  extend type Mutation {
    signIn(email: String!, password: String!, name: String!): User
    logIn(email: String!, password: String!): User
  }

  extend type Query {
    getMyBlogs(token: String!, createdAt: String, beforeCurrentData: Boolean): [MyBlogs]
  }

  type MyBlogs {
    createdAt: String!
    blogHeader: String!
    blogContent: String!
    tags: [String]
  }

  type User {
    email: String!
    id: ID!
    token: String!
    name: String!
  }
`;
