let {ApolloServer} = require('apollo-server')
let typeDefs = require('./schema/typeDefs')
let resolvers = require('./schema/resolvers')

let server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({url})=>{
    console.log(`server is running ${url}`)
})
/*
//https://sl.bing.net/biH3ASzEHn2 */