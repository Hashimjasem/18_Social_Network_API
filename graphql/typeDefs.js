const {qgl} = require('apollo-server')

module.exports = qgl`
type User{
    id: ID
    userName: String,
    email: String,
    thoughts: [String],
    friends: [User]
}

type Thoughts{
    id: ID,
    thoughtText: String,
}
`