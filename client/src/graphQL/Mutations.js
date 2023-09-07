import { gql } from "@apollo/client";

let ADD_USER_INFO = gql`
    mutation Mutation($username: String, $firstName: String, $lastName: String, $phoneNo: Int, $dateOfbirth: String, $address: String) {
  addAddressInfo(tableName: $username, firstName: $firstName, lastName: $lastName, phoneNo: $phoneNo, dateOfbirth: $dateOfbirth, address: $address) {
    firstName
    lastName
    phoneNo
    dateOfbirth
    address
  }
    }

`
export default ADD_USER_INFO