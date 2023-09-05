let {gql} = require('apollo-server')



let typeDefs = gql`
  type setInfo{
    username:String!
    password:String!
  }
  type loginInfo{
    username:String!
    password:String!
  }
  type addressInfo{
    firstName:String!
    lastName:String!
    phoneNo:Int!
    dateOfbirth:String!
    address:String!
  }

  type Mutation{
    addLoginInfo(username:String password:String):setInfo
  }
  type Query{
    getLoginInfo(username:String!):loginInfo
  }
  type Query{
    getAddressInfo(username:String!):addressInfo
  }
  type Mutation{
    addAddressInfo(firstName:String! lastName:String! phoneNo:Int! dateOfbirth:String! address:String!):addressInfo
  }
  `
//make sure you go through the type definition and then use the logic you used for the express address book for this particular one
    module.exports = typeDefs


    