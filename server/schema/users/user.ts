import {gql} from 'apollo-server'

export default gql`
    extend type Mutation {
        signin(email:String!, password: String! ): User
        login(email:String!, password: String!):User
    }
    type User {
        email: String!
        _id: ID!
        token: String!
    }
`
