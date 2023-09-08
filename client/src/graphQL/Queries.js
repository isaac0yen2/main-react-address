import {
    gql
} from '@apollo/client'

export let Load_login_info = gql`
  query Query($username: String) {
    getLoginInfo(username: $username) {
      username
      password
    }
  }
`;
export let LOAD_TABLE_DATA = gql`
query Query($tableName: String) {
  getAddressInfo(tableName: $tableName) {
    firstName
    lastName
    phoneNo
    dateOfbirth
    address
  }
}
`
