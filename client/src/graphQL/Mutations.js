import { gql } from "@apollo/client";

let ADD_USER_INFO = gql`
    mutation Mutation($tableName: String, $firstName: String, $lastName: String, $phoneNo: Int, $dateOfbirth: Blob, $address: String) {
  addAddressInfo(tableName: $tableName, firstName: $firstName, lastName: $lastName, phoneNo: $phoneNo, dateOfbirth: $dateOfbirth, address: $address) {
    firstName
    lastName
    phoneNo
    dateOfbirth
    address
  }
    }

`
export default ADD_USER_INFO