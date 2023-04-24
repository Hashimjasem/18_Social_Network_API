const {AppolloServer} = require('apollo-server')
const mongoose = require('mongoose')

const MONGODB = "mongodb://127.0.0.1:27017/socialNetworkDB";

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new AppolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {useNewUrParser: true})
.then(() => {
    console.log("mongoDB Connection Succesful");
    return server.listen({port: 5000});
})
.then((res) => {
    console.log(`Server running at ${res.url}`)
});