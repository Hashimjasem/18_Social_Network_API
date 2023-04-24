const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID
    userName: String!
    email: String!
    thoughts: [Thoughts]
    friends: [User]
    createdAt: String
  }

  type Thoughts {
    id: ID
    thoughtText: String!
    createdAt: String
    user: User
  }

  input UserInput {
    userName: String!
    email: String!
  }

  input ThoughtInput {
    thoughtText: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    thoughts: [Thoughts]
    thought(id: ID!): Thoughts
  }

  type Mutation {
    addUser(userInput: UserInput): User
    addThought(thoughtInput: ThoughtInput): Thoughts
    addFriend(userId: ID!, friendId: ID!): User
  }
`;

module.exports = typeDefs;
