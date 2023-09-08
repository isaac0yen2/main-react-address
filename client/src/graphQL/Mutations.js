import { gql } from "@apollo/client";

let ADD_USER_INFO = gql`
    mutation Mutation($tableName: String, $firstName: String, $lastName: String, $phoneNo: String, $dateOfbirth: String, $address: String) {
  addAddressInfo(tableName: $tableName, firstName: $firstName, lastName: $lastName, phoneNo: $phoneNo, dateOfbirth: $dateOfbirth, address: $address) {
    firstName
    lastName
    phoneNo
    dateOfbirth
    address
  }
    }

`


let REGISTER_NEW_USER = gql`
mutation Mutation($username: String, $password: String) {
  addLoginInfo(username: $username, password: $password) {
    username
    password
  }
}
`
export default (ADD_USER_INFO,REGISTER_NEW_USER)