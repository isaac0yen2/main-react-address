let {ApolloServer} = require('apollo-server')
let typeDefs = require('./schema/typeDefs')
let resolvers = require('./schema/resolvers')

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

db.run(
  `
  CREATE TABLE IF NOT EXISTS userLoginDetails (
  id INTEGER PRIMARY KEY,
  username TEXT,
  password TEXT
 )
  `
  )


let server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({url})=>{
    console.log(`server is running ${url}`)
})
/*
//https://sl.bing.net/biH3ASzEHn2 */