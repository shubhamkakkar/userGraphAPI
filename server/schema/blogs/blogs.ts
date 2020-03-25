import {gql} from 'apollo-server';

export default gql`
  extend type Mutation {
    createBlog(token: String!, blogHeader: String!, blogContent: String!, tags: [String]): Blog
  }
  extend type Query {
    getAllBlogs(tags: [String], createdAt: String, beforeCurrentData: Boolean): [Blog]
  }

  type Blog {
    createdAt: String!
    blogHeader: String!
    blogContent: String!
    user: CreatorOfBlog
    tags: [String]
  }

  type CreatorOfBlog {
    email: String!
    name: String!
  }
`;
