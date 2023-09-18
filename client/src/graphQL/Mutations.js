import { gql } from "@apollo/client";

export let ADD_USER_INFO = gql`
    mutation Mutation($tableName: String, $firstName: String, $lastName: String, $phoneNo: String, $dateOfBirth: String, $address: String) {
  addAddressInfo(tableName: $tableName, firstName: $firstName, lastName: $lastName, phoneNo: $phoneNo, dateOfbirth: $dateOfBirth, address: $address) {
    firstName
    lastName
    phoneNo
    dateOfbirth
    address
  }
    }

`


export let REGISTER_NEW_USER = gql`
mutation Mutation($username: String, $password: String) {
  addLoginInfo(username: $username, password: $password) {
    username
    password
  }
}
`
export let EDIT_CURRENT_FEILD = gql`
mutation Mutation($username: String, $id: Int, $updatedFirstName: String, $updatedLastName: String, $updatedPhoneNo: String, $updatedDateOfBirth: String, $updatedAddress: String) {
  editAddressInfo(tableName: $username, id: $id, firstName: $updatedFirstName, lastName: $updatedLastName, phoneNo: $updatedPhoneNo, dateOfbirth: $updatedDateOfBirth, address: $updatedAddress) {
    id
    firstName
    lastName
    phoneNo
    dateOfbirth
    address
  }
}
`
export let DELETE_USER_INFO = gql`
mutation Mutation($tableName: String, $id: Int) {
  deleteAddressInfo(tableName: $tableName, id: $id) {
    id
    firstName
    lastName
    phoneNo
    dateOfbirth
    address
  }
}
`