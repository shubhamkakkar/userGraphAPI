import {gql} from 'apollo-server'

export default gql`
    extend type Mutation {
        createBlog(token: String!, blogHeader: String!, blockContent:String!, tags: [String]):Blog
    }
    extend  type Query {
        getAllBlogs: [Blog]
    }
    
    type Blog { 
        createdAt: String!
        blogHeader: String!
        blogContent: String!
        userId: ID!
    }
`;
