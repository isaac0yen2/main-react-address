let {gql} = require('apollo-server')



let typeDefs = gql`
  type setInfo{
    username:String
    password:String
  }
  type loginInfo{
    username:String
    password:String
  }
  type addressInfo{
    id:Int
    firstName:String
    lastName:String
    phoneNo:String
    dateOfbirth:String
    address:String
  }

  type Mutation{
    addLoginInfo(username:String password:String):setInfo
  }
  type Query{
    getLoginInfo(username:String):loginInfo
  }
  type Query{
    getAddressInfo(tableName:String):[addressInfo]
  }
  type Mutation{
    addAddressInfo(tableName:String firstName:String lastName:String phoneNo:String dateOfbirth:String address:String):addressInfo
  }
  type Mutation{
    editAddressInfo(tableName:String id:Int firstName:String lastName:String phoneNo:String dateOfbirth:String address:String):addressInfo
  }
  type Mutation{
    deleteAddressInfo(tableName:String id:Int):[addressInfo]
  }
  `
//make sure you go through the type definition and then use the logic you used for the express address book for this particular one
module.exports = typeDefs