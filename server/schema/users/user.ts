import {gql} from 'apollo-server'

export default gql`
    extend type Mutation {
        signIn(email:String!, password: String! ): User
        login(email:String!, password: String!):User
    }
    type User {
        email: String!
        id: ID!
        token: String!
    }
`
